import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOrdersByStoreOwnerApi, completeOrderApi } from "../../api/orderApi";
import "../../styles/OrderListByOwner.css";
import { useNavigate } from "react-router-dom";


const StoreOwnerOrders = () => {
    const [message, setMessage] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // אם אין טוקן, הפנה לדף ההתחברות
    useEffect(() => {
        if (!token) {
            navigate("/OwnerLogin");
        }
    }, [token, navigate]);

    const { data: orders, error, isLoading, refetch } = useQuery({
        queryKey: ['storeOwnerOrders'],
        refetchInterval: 60000,
        refetchOnWindowFocus: true,
        queryFn: () => getOrdersByStoreOwnerApi(token),
        enabled: !!token,
    });

    const mutation = useMutation({
        mutationFn: completeOrderApi, // עדכון הסטטוס
        onSuccess: (_, variables) => {
            const supplierId = variables;
            refetch();
        },
        onError: (error) => {
            setMessage("שגיאה בעדכון הסטטוס: " + error.message);
        }
    });

    const handleCompleteOrder = async (orderId, status) => {
        setMessage("");
        try {
            await mutation.mutateAsync({ orderId, status, token });
        } catch (error) {
            setMessage("Error completing order: " + error);
        }
    };

    const handleViewProducts = (orderId) => {
        const order = orders.find(order => order._id === orderId);
        setSelectedOrder(order);
    };

    if (isLoading) return <p>Loading orders...</p>;
    if (error) return <p>Error fetching orders: {error.message}</p>;

    return (
        <div className="orders-container">
            <h2 className="orders-title">הזמנות בעל המכולת</h2>
            {mutation.isSuccess && <p className="success">הסטטוס עודכן בהצלחה!</p>}
            {message && <p className="status-message">{message}</p>}
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>מספר הזמנה</th>
                        <th>ספק</th>
                        <th>תאריך</th>
                        <th>סטטוס</th>
                        <th>מוצרים</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                                אין הזמנות להצגה בשלב זה.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.supplierName || ""}</td>
                                <td>{order.createdAt.split('T')[0]} {order.createdAt.split('T')[1].slice(0, 5)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button
                                        className="view-products-btn"
                                        onClick={() => handleViewProducts(order._id)}
                                    >
                                        צפיה במוצרים
                                    </button>
                                </td>
                                <td>
                                    {order.status === "בתהליך" && (
                                        <button
                                            className="complete-btn"
                                            onClick={() => handleCompleteOrder(order._id, "הושלמה", order.supplierId)}
                                        >
                                            השלם הזמנה
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {selectedOrder && selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="order-products-modal">
                    <h3>מוצרים בהזמנה</h3>
                    <ul>
                        {selectedOrder.items.map((item, index) => (
                            <li key={index}>
                                {item.productName} - {item.quantity} יחידות
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setSelectedOrder(null)}>סגור</button>
                </div>
            )}

        </div>
    );
};

export default StoreOwnerOrders;
