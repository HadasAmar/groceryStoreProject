import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOrdersBySupplierApi, updateOrderStatusApi } from "../../api/orderApi"; // Import API calls
import "../../styles/OrderListBySupplier.css"; // Import CSS for styling
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { jwtDecode } from "jwt-decode";


const SupplierOrders = () => {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // קבלת הטוקן מה-localStorage

    // אם אין טוקן, הפנה לדף ההתחברות
    useEffect(() => {
        if (!token) {
            navigate("/SupplierLogin");
        }
    }, [token, navigate]);

    const decodedToken = jwtDecode(token);  // פענוח ה-TOKEN
    const supplierId = decodedToken._id;  // תחליף את זה לשם המפתח הנכון    // שימוש ב-useQuery כדי לשלוף את ההזמנות
    const { data: orders, error, isLoading, refetch } = useQuery({
        queryKey: ['orders', supplierId],
        refetchInterval: 60000, 
        refetchOnWindowFocus: true,
        queryFn: () => {
            const response = getOrdersBySupplierApi(token);
            console.log("what orders", response); // בדוק את התגובה מה-API
            return response;
        },
        enabled: !!token,
    });


    // שימוש ב-useMutation לעדכון סטטוס ההזמנה
    const mutation = useMutation({
        mutationFn: updateOrderStatusApi,
        onSuccess: () => {
            setMessage("הסטטוס עודכן בהצלחה!");
            refetch(); // לאחר עדכון הסטטוס, נרצה לשלוף את ההזמנות שוב
        },
        onError: (error) => {
            setMessage("שגיאה בעדכון הסטטוס: " + error.message);
        }
    });

    const handleStartProcessingOrder = async (orderId, status) => {
        try {
            // עדכון סטטוס ההזמנה
            await mutation.mutateAsync({orderId, status, token}); // שליחה של שני פרמטרים
        } catch (error) {
            setMessage("Error starting order processing: " + error.message);
        }
    };


    if (isLoading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error.message}</p>;

    return (
        <div className="orders-container">
            <h2 className="orders-title">הזמנות ספק</h2>
            {message && <p className="status-message">{message}</p>}
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date Order</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.split('T')[0]}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status === "ממתינה" && (
                                    <button
                                        className="complete-btn"
                                        onClick={() => handleStartProcessingOrder(order._id, "בתהליך")}
                                    >
                                        Start Processing
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default SupplierOrders;
