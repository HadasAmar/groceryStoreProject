import { useState, useEffect } from "react";
import { createOrderApi } from "../../api/orderApi";
import { getSuppliersApi } from "../../api/supplierApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "../../styles/ProductList.css"; 
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [products, setProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token"); 
    const navigate=useNavigate()
        useEffect(() => {
            if (!token) {
                navigate("/OwnerLogin");
            }
        }, [token, navigate]);

        const { data: suppliers, error, isLoading } = useQuery({
        queryKey: ['suppliers'],
        refetchOnWindowFocus: true,
        refetchInterval: 60000, 
        queryFn: () => {
                    const response = getSuppliersApi(token);
                    return response;
                },
    });

    const handleSupplierChange = (e) => {
        const supplierId = e.target.value;
        setSelectedSupplier(supplierId);
    
        const selectedSupplierObj = suppliers.find(s => s._id === supplierId);
    
        if (selectedSupplierObj && selectedSupplierObj.products.length > 0) {
            setProducts(selectedSupplierObj.products);
            setMessage("");
        } else {
            setProducts([]);
            setMessage("לא נמצאו מוצרים לספק זה");
        }
    
        setOrderItems([]); 
    };

    const handleAddProduct = (product) => {
        setOrderItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.productId === product._id);

            if (existingItem) {
                // אם המוצר כבר קיים, עדכון הכמות
                return prevItems.map((item) =>
                    item.productId === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // אם זה מוצר חדש, הוספה לרשימה
                return [...prevItems, { productId: product._id, productName:product.name, quantity: 1 }];
            }
        });
    };

    const handleQuantityChange = (index, value) => {
        const updatedItems = [...orderItems];
        updatedItems[index].quantity = value;
        setOrderItems(updatedItems);
    };

    const mutation = useMutation({
        mutationFn: createOrderApi,
        
        onError: (error) => {
            setMessage("שגיאה ביצירת ההזמנה: " + error);
        }
    });

    const handleSubmit = async (e) => {
        setMessage(""); // איפוס הודעת שגיאה קודמת
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
                if (item.quantity < product.minQuantity) {
                    setMessage("מינימום היחידות להזמנת  " +product.name+" הוא "+ product.minQuantity);
                    hasError = true;
                    return; 
                }
            }
        });
    
        // אם יש שגיאה, לא שולחים את ההזמנה
        if (hasError) {
            return;
        }
        const orderData = { supplierId: selectedSupplier, supplierName: supplierName, items: orderItems };

        try {
            await mutation.mutateAsync({ orderData, token }); // שליחה בעזרת useMutation

        } catch (error) {
            setMessage("שגיאה ביצירת ההזמנה: " + error);
        }
    };

    if (isLoading) return <p>Loading suppliers...</p>;
    if (error) return <p>Error loading suppliers: {error.message}</p>;

    return (
        <div className="order-container">
            <h2 className="order-title">הוספת הזמנה</h2>
            {mutation.isSuccess && <p className="success">ההזמנה נוספה בהצלחה!</p>}
            {message && <p className="status-message">{message}</p>}
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

        </div>
    );

};
export default ProductList;
