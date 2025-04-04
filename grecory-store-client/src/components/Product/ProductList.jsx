import { useState, useEffect } from "react";
import { createOrderApi } from "../../api/orderApi";
import { getSuppliersApi } from "../../api/supplierApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "../../styles/ProductList.css"; // ייבוא קובץ CSS לעיצוב
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const queryClient = useQueryClient(); // קבלת ה-queryClient
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [products, setProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token"); // קבלת הטוקן מה-localStorage
    const navigate=useNavigate()
        // אם אין טוקן, הפנה לדף ההתחברות
        useEffect(() => {
            if (!token) {
                navigate("/OwnerLogin");
            }
        }, [token, navigate]);
    // שימוש ב-useQuery כדי לקבל את הספקים
    const { data: suppliers, error, isLoading } = useQuery({
        queryKey: ['suppliers'],
        refetchOnWindowFocus: true,
        refetchInterval: 60000, 
        queryFn: () => {
                    const response = getSuppliersApi(token);
                    console.log("what product owner", response); // בדוק את התגובה מה-API
                    return response;
                },
        enabled: !!token,

    });

    const handleSupplierChange = (e) => {
        const supplierId = e.target.value;
        setSelectedSupplier(supplierId);

        // מוצאים את המוצרים של הספק הנבחר
        const selectedSupplierObj = suppliers.find(s => s._id === supplierId);
        setProducts(selectedSupplierObj ? selectedSupplierObj.products : []);
        setOrderItems([]); // מאפסים בחירת מוצרים
    };

    const handleAddProduct = (product) => {
        setOrderItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.productId === product._id);

            if (existingItem) {
                // אם המוצר כבר קיים, עדכן את הכמות
                return prevItems.map((item) =>
                    item.productId === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // אם זה מוצר חדש, הוסף אותו לרשימה
                return [...prevItems, { productId: product._id, quantity: 1 }];
            }
        });
    };

    const handleQuantityChange = (index, value) => {
        const updatedItems = [...orderItems];
        updatedItems[index].quantity = value;
        setOrderItems(updatedItems);
    };

    // שימוש ב-useMutation כדי לשלוח את ההזמנה
    const mutation = useMutation({
        mutationFn: createOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['storeOwnerOrders']); // מעדכן את רשימת ההזמנות של הספק
            setMessage("הזמנה נוספה בהצלחה!");
        },
        onError: (error) => {
            setMessage("שגיאה ביצירת ההזמנה: " + error.message);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSupplier || orderItems.length === 0) {
            setMessage("נא לבחור ספק ולהוסיף מוצרים להזמנה");
            return;
        }

        const selectedSupplierObj = suppliers.find(s => s._id === selectedSupplier);
        const supplierName = selectedSupplierObj ? selectedSupplierObj.companyName : "";
        let hasError = false; // דגל שגיאה

        // בודקים את כל המוצרים בהזמנה
        orderItems.map(item => {
            const product = products.find(p => p._id === item.productId);
            if (product) {
                console.log("product: " , product); // הוספת לוג
                alert("product: " + product.quantity + " item: " + item.quantity); // הוספת לוג
                if (item.quantity < product.minQuantity) {
                    setMessage("מינימום היחידות להזמנת  " +product.name+" הוא "+ product.minQuantity);
                    hasError = true; // אם יש שגיאה, משנים את הדגל
                    return; // יציאה מהפונקציה אם הכמות גבוהה מהמלאי
                }
            }
        });
    
        // אם יש שגיאה, לא שולחים את ההזמנה
        if (hasError) {
            return;
        }
        const orderData = { supplierId: selectedSupplier, supplierName: supplierName, items: orderItems };

        try {
            console.log("Order data:", orderData); // הוספת לוג
            console.log("Token in try:", token); // הוספת לוג
            await mutation.mutateAsync({ orderData, token }); // שליחה בעזרת useMutation

        } catch (error) {
            setMessage("שגיאה ביצירת ההזמנה: " + error.message);
        }
    };

    if (isLoading) return <p>Loading suppliers...</p>;
    if (error) return <p>Error loading suppliers: {error.message}</p>;

    return (
        <div className="order-container">
            <h2 className="order-title">הוספת הזמנה</h2>
            <form className="order-form" onSubmit={handleSubmit}>
                <label className="order-label">בחר ספק:</label>
                <select
                    className="order-select"
                    value={selectedSupplier}
                    onChange={handleSupplierChange}
                    required
                >
                    <option value="">בחר ספק</option>
                    {suppliers?.map(supplier => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.companyName}
                        </option>
                    ))}
                </select>

                <h3 className="products-title">מוצרים זמינים</h3>
                <div className="available-products">
                    {products.map(product => (
                        <div key={product._id} className="product-item">
                            <span className="product-name">{product.name} - ₪{product.price}</span>
                            <button
                                type="button"
                                className="btn-add"
                                onClick={() => handleAddProduct(product)}
                            >
                                ➕ הוסף
                            </button>
                        </div>
                    ))}
                </div>

                <h3 className="order-details-title">פרטי ההזמנה</h3>
                <div className="order-items">
                    {orderItems.map((item, index) => (
                        <div key={index} className="order-item">
                            <span className="order-product-name">
                                {products.find(p => p._id === item.productId)?.name}
                            </span>
                            <input
                                type="number"
                                min="1"
                                className="order-quantity"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn-primary">📩 שלח הזמנה</button>
            </form>

            {message && <p className="status-message">{message}</p>}
        </div>
    );

};
export default ProductList;
