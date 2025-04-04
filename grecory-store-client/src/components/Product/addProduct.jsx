import { useState, useEffect } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { addProductApi, getProductsApi } from "../../api/productApi"; // פונקציות ה-API
import { useNavigate } from "react-router-dom";
import "../../styles/addProduct.css"; // ייבוא קובץ CSS לעיצוב

const AddProduct = () => {
    const queryClient = new QueryClient(); // יצירת מופע של QueryClient
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        minQuantity: ""
    });
    const token = localStorage.getItem("token");  // הוצאת הטוקן


    useEffect(() => {
        console.log("❤️")

        if (!token) {
            navigate("/SupplierLogin");
        }
    }, [token, navigate]);


    // שליחת ה-API להוספת מוצר חדש
    const mutation = useMutation({
        mutationFn: addProductApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']); // עדכון רשימת המוצרים
            alert("המוצר נוסף בהצלחה!");
            refetch(); // עדכון המוצרים לאחר ההוספה
        },
        onError: (error) => {
            alert("שגיאה בהוספת המוצר: " + error.message);
        }
    });

    // שליפת המוצרים הקיימים מה-API
    const { data: products, isLoading, error, refetch } = useQuery({
        queryKey: ['products'],
        staleTime: Infinity,
        queryFn: () => getProductsApi(token),
        enabled: !!token  // הפעלת השאילתה רק אם יש טוקן
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);  // שליחה ל-API
    };

    if (isLoading) return <p>טוען מוצרים...</p>;
    if (error) return <p>שגיאה: {error.message}</p>;

    return (
        <div className="add-product-container">
            {mutation.isSuccess && <p>המוצר נוסף בהצלחה!</p>}
            {mutation.isError && <p>שגיאה: {mutation.error.message}</p>}

            <h2>הוספת מוצר</h2>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="שם המוצר"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="מחיר"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                />
                <input
                    type="number"
                    name="minQuantity"
                    placeholder="כמות מינימלית"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                    required
                />
                <button type="submit" disabled={mutation.isLoading}>הוסף מוצר</button>

            </form>

            <h3>המוצרים הקיימים שלך:</h3>
            <table>
                <thead>
                    <tr>
                        <th>שם המוצר</th>
                        <th>מחיר</th>
                        <th>כמות מינימלית</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.minQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddProduct;
