import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOrdersBySupplierApi, updateOrderStatusApi } from "../../api/orderApi";
import "../../styles/OrderListBySupplier.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SupplierOrders = () => {
    const [message, setMessage] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // אם אין טוקן, הפנה לדף ההתחברות
    useEffect(() => {
        if (!token) {
            navigate("/SupplierLogin");
        }
    }, [token, navigate]);

    const decodedToken = jwtDecode(token);
    const supplierId = decodedToken._id;

    const { data: orders, error, isLoading, refetch } = useQuery({
        queryKey: ['orders', supplierId],
        queryFn: () => getOrdersBySupplierApi(token),
        refetchInterval: 60000,
        refetchOnWindowFocus: true,
        enabled: !!token,
    });

    useEffect(() => {
        refetch();
    }, [filter]);

    const mutation = useMutation({
        mutationFn: updateOrderStatusApi,
        onSuccess: () => {
            refetch();
        },
        onError: (error) => {
            setMessage("שגיאה בעדכון הסטטוס: " + error.message);
        }
    });

    const handleStartProcessingOrder = async (orderId, status) => {
        setMessage("");
        try {
            await mutation.mutateAsync({ orderId, status, token });
        } catch (error) {
            setMessage("Error starting order processing: " + error.message);
        }
    };

    // סינון ההזמנות
    const filteredOrders = orders?.filter((order) => {
        if (filter === "all") {
            return true; // כל ההזמנות
        }
        if (filter === "completed") {
            return order.status !== "הושלמה"; // רק הזמנות שהסטטוס שלהן לא הושלמו
        }
        return true;
    });

    if (isLoading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error.message}</p>;

    return (
        <div className="orders-container">
            <h2 className="orders-title">הזמנות ספק</h2>

            <div className="filter-buttons">
                <button
                    className={filter === "all" ? "active" : ""}
                    onClick={() =>{setFilter("all"); setSelectedOrder(null)}} 
                >
                    כל ההזמנות
                </button>
                <button
                    className={filter === "pending" ? "active" : ""}
                    onClick={() => {setFilter("completed"); setSelectedOrder(null)}} 
                >
                    הזמנות בתהליך
                </button>
            </div>

            {mutation.isSuccess && <p className="success">הסטטוס עודכן בהצלחה!</p>}
            {message && <p className="status-message">{message}</p>}

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>מזהה הזמנה</th>
                        <th>תאריך</th>
                        <th>סטטוס</th>
                        <th>מוצרים</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders?.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                                אין הזמנות להצגה בשלב זה.
                            </td>
                        </tr>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.createdAt.split('T')[0]} {order.createdAt.split('T')[1].slice(0, 5)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button
                                        className="view-products-btn"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        צפיה במוצרים
                                    </button>
                                </td>
                                <td>
                                    {order.status === "ממתינה" && (
                                        <button
                                            className="complete-btn"
                                            onClick={() => handleStartProcessingOrder(order._id, "בתהליך")}
                                        >
                                            התחל תהליך
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {selectedOrder && selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="order-products-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>מוצרים בהזמנה</h3>
                        <ul>
                            {selectedOrder.items.map((item, index) => (
                                <li key={index}>
                                    {item.productName} - {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setSelectedOrder(null)}>סגור</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupplierOrders;
