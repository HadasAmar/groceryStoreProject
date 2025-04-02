import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { load_customers, update_user } from "../redux/actions/supplierAction";
import { getAllCustomers } from "../axios/customerAxios";
import { getByUser } from "../axios/suppliersAxios";
import { clear_cart, load_orders } from "../redux/actions/orderAction";

export const Login = () => {
    let myCustomers = useSelector(x => x.dataCustomerReducer.listCustomers);

    const orders = useSelector((x) => x.dataCartReducer.orders);
    const currentIsLog = useSelector((x) => x.dataCustomerReducer.currentUser);

    const [userItem, setUserItem] = useState({});
    const [myExeption, setMyExeption] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (myCustomers != null && myCustomers.length === 0) {
            getAllCustomers()
                .then((x) => dispatch(load_customers(x.data)))
                .catch((err) => console.log(err));
        }
    }, []);

    const checkLogin = (e) => {
        setMyExeption({ ...myExeption, general: null });
        e.preventDefault();
        const foundUser = myCustomers.find(x => x.name === userItem.name && x.password === userItem.password);
        if (foundUser === undefined)
            setMyExeption({ ...myExeption, general: "אינך רשום במערכת" });
        else if (userItem.name === 'hadas' && userItem.password == '111') {
            // alert(" מנהל " + foundUser.name);
            dispatch(update_user(foundUser));
        } else {
            // alert(" לקוח " + foundUser.name);
            dispatch(update_user(foundUser));
            getByUser(currentIsLog._id)
                .then((orders) => dispatch(load_orders(orders.data)))
                .catch((err) => console.error(err));
            dispatch(clear_cart())
            navigate("/myHome");

        }
    };

    return (
        <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form
                className="container bg-white p-5 rounded shadow"
                style={{ maxWidth: "500px" }}
                onSubmit={(e) => checkLogin(e)}
            >
                <h3 className="text-center mb-4" style={{ color: "#4a90e2" }}>  התחברות</h3>
                <div className="mb-3">
                    <label className="form-label">שם:</label>
                    <input
                        className="form-control"
                        placeholder="הכנס שם"
                        onChange={(e) => setUserItem({ ...userItem, name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">סיסמא:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="הכנס סיסמא"
                        onChange={(e) => setUserItem({ ...userItem, password: e.target.value })}
                    />
                </div>
                {myExeption.general && (
                    <p className="alert alert-danger">{myExeption.general}</p>
                )}
                <div className="form-check mb-3">
                    <Link className="nav-link text-primary" to="/myRegister">מעבר לדף הרשמה</Link>
                </div>
                <button type="submit" className="btn btn-primary w-100">התחבר</button>
            </form>
        </div>
    );
};
