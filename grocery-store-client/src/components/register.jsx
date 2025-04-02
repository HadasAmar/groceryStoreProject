import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCustomer, getAllCustomers } from "../axios/customerAxios";
import { add_customer, load_customers } from "../redux/actions/supplierAction";

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let myCustomers = useSelector((x) => x.dataCustomerReducer.listCustomers);

    useEffect(() => {
        if (myCustomers != null && myCustomers.length === 0) {
            getAllCustomers()
                .then((x) => dispatch(load_customers(x.data)))
                .catch((err) => console.log(err));
        }
    }, []);

    // שמירה על פרטי הלקוח
    const [customerItem, setCustomerItem] = useState({
        name: null,
        password: null,
        cardNumber: null,
        cardExpiration: null,
        cardCVV: null,
        cardHolder: null
    });
    const [myExeption, setMyExeption] = useState({
        name: null,
        password: null,
        cardNumber: null,
        cardExpiration: null,
        cardCVV: null,
        cardHolder: null
    });
    const validateField = (field, value) => {
        let error = null
        switch (field) {
            case "name":
                if (!value) {
                    error = "חובה להכניס שם משתמש";
                } else if (value.length < 3) {
                    error = "שם המשתמש חייב להכיל לפחות 3 תווים";
                }
                else if (myCustomers.some(x => x.name === value)) {
                    console.log("my", myCustomers);
                    error = "שם המשתמש כבר קיים";
                }
                break;
            case "password":
                if (!value) {
                    error = "חובה להכניס סיסמא";
                } else if (value.length < 3) {
                    error = "סיסמא חייבת להכיל לפחות 3 תווים";
                }
                break;
            case "cardNumber":
                if (!value) {
                    error = "חובה להכניס מספר אשראי ";
                } else if (value.length != 16) {
                    error = "מספר אשראי חייב להכיל 16 ספרות";
                }
                break;
            case "cardExpiration":
                if (!value) {
                    error = "חובה להכניס תוקף כרטיס";
                } else if (value.length != 4) {
                    error = "תוקף חייב להכיל 4 ספרות";
                }
                break;
            case "cardHolder":
                if (!value) {
                    error = "חובה להכניס שם בעל הכרטיס ";
                } else if (value.length < 3) {
                    error = "שם חייב להכיל לפחות 3 תוים ";
                }
                break;


        }
        setMyExeption({ ...myExeption, [field]: error })

    }

    const handleChange = (field, value) => {
        setCustomerItem({ ...customerItem, [field]: value });
        validateField(field, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(myExeption).some((error) => error != null);
        const hasNull = Object.values(customerItem).some((value) => !value);
        if (hasErrors || hasNull) {
            console.log("error", myExeption)
            alert("יש למלא שדות או לתקן את השגיאות");
            return;
        }
        addCustomer(customerItem)
            .then((x) => {
                dispatch(add_customer(x.data));
                alert("הלקוח נוסף בהצלחה");
                navigate("/myLogin");
            })
            .catch((err) => console.error(err));
    }

    return (
        <div style={{ backgroundColor: "#e9f7fc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="container p-5 bg-white rounded shadow" style={{ maxWidth: "600px" }}>
                <h3 className="text-center mb-4" style={{ color: "#4a90e2" }}>רישום לקוח</h3>
                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="הקלד שם לקוח"
                            className={`form-control ${myExeption.name ? "is-invalid" : ""}`}
                            onBlur={(e) => handleChange("name", e.target.value)}
                        />
                        {myExeption.name && <div className="invalid-feedback">{myExeption.name}</div>}

                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="הקלד סיסמא"
                            className={`form-control ${myExeption.password ? "is-invalid" : ""}`}
                            onBlur={(e) => handleChange("password", e.target.value)}
                        />
                        {myExeption.password && <div className="invalid-feedback">{myExeption.password}</div>}

                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="הקלד מספר כרטיס אשראי"
                            className={`form-control ${myExeption.cardNumber ? "is-invalid" : ""}`}
                            onBlur={(e) => handleChange("cardNumber", e.target.value)}
                        />
                        {myExeption.cardNumber && <div className="invalid-feedback">{myExeption.cardNumber}</div>}

                    </div>

                    <div className="mb-3">
                        <input
                            placeholder="הקלד תוקף כרטיס"
                            className={`form-control ${myExeption.cardExpiration ? "is-invalid" : ""}`}
                            onBlur={(e) => handleChange("cardExpiration", e.target.value)}
                        />
                        {myExeption.cardExpiration && <div className="invalid-feedback">{myExeption.cardExpiration}</div>}

                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder="הקלד קוד כרטיס"
                            className={`form-control ${myExeption.cardCVV ? "is-invalid" : ""}`}
                            onBlur={(e) => handleChange("cardCVV", e.target.value)}
                        />
                        {myExeption.cardCVV && <div className="invalid-feedback">{myExeption.cardCVV}</div>}

                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="הקלד שם בעל הכרטיס"
                            className={`form-control ${myExeption.cardHolder ? "is-invalid" : ""}`}
                            onBlur={(e) => handleChange("cardHolder", e.target.value)}
                        />
                        {myExeption.cardHolder && <div className="invalid-feedback">{myExeption.cardHolder}</div>}

                    </div>

                    <button type="submit" className="btn btn-primary w-100">הירשם</button>
                </form>
            </div>
        </div>
    );
};
