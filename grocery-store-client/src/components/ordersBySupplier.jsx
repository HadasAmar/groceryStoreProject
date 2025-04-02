import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByUser } from "../axios/suppliersAxios";
import { load_orders } from "../redux/actions/orderAction";
import { Link } from "react-router-dom";

export const OrderHistory = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(x => x.dataCustomerReducer.currentUser);
    const orders = useSelector((x) => x.dataCartReducer.orders);

    useEffect(() => {
        if (orders != null && orders.length === 0) {
            getByUser(currentUser._id)
                .then((orders) =>{ 
                    debugger
                    dispatch(load_orders(orders.data))})
                .catch((err) => console.error(err));
        }
    }, [orders]);


    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <h2 className="text-center py-4">היסטוריית הזמנות</h2>
            <div className="container py-3">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={order._id} className="card mb-3 shadow-sm rounded-3">
                            <div className="card-body">
                                <h4 className="card-title">
                                    הזמנה #{index + 1}
                                </h4>
                                <h5>
                                    תאריך ביצוע ההזמנה: {new Date(order.dateOrder).toLocaleDateString()}
                                </h5>
                                <Link
                                to={`/detailsOrder/${order._id}`}
                                    className="btn w-100"
                                    style={{
                                        backgroundColor: "transparent",
                                        fontSize: "0.9rem",
                                        color: "#007bff",
                                    }}
                                    >רשימת משחקים </Link>
                                <p className="text-muted">
                                    סך הכול: {order.sum} ₪
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">לא נמצאו הזמנות.</p>
                )}
            </div>
        </div>
    );
};
