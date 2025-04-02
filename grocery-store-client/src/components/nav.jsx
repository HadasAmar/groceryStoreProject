import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Nav = () => {
    let currentUser = useSelector(x => x.dataCustomerReducer.currentUser);
    const isManager=currentUser.name=='hadas'&&currentUser.password=='111'

    return (
        <nav
            className="navbar navbar-expand-sm bg-primary navbar-dark text-center"
            style={{ padding: "1.1rem 1rem", margin:"0" }}
        >
            <div className="container-fluid" style={{ direction: "rtl" }}>
                <ul className="navbar-nav flex-row justify-content-center w-100">
                    <li className="nav-item">
                        <Link className="nav-link active" to="myLogin">
                            התחברות
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link active" to="myRegister">
                            הרשמה
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link active" to="myHome">
                            דף הבית
                        </Link>
                    </li>
                    {isManager&&<li className="nav-item">
                        <Link className="nav-link" to="myGames">
                            רשימת משחקים
                        </Link>
                    </li>}
                    {isManager&&<li className="nav-item">
                        <Link className="nav-link" to="myCategories">
                            רשימת קטגוריות
                        </Link>
                    </li>}
                    {isManager&&<li className="nav-item">
                        <Link className="nav-link" to="myUsers">
                            רשימת משתמשים
                        </Link>
                    </li>}
                    {!isManager&&<li className="nav-item">
                        <Link className="nav-link" to="myCart">
                            עגלת קניות 
                        </Link>
                    </li>}
                    {!isManager&&<li className="nav-item">
                        <Link className="nav-link" to="myOrdersHistory">
                            אזור אישי
                        </Link>
                    </li>}
                    {isManager&&<li className="nav-item">
                        <Link className="nav-link" to="myAddCategory">
                            הוספת קטגוריה
                        </Link>
                    </li>}
                    {isManager&&<li className="nav-item">
                        <Link className="nav-link" to="myAddGame">
                            הוספת משחק
                        </Link>
                    </li>}
                </ul>
                <p
                    className="navbar-text text-light ms-auto align-self-center pe-3 text-nowrap"
                    style={{ maxWidth: "200px" }} // אפשר לשנות את הרוחב לפי הצורך
                >
                    {`שלום, ${currentUser.name}`}
                </p>

            </div>
        </nav>
    );
};
