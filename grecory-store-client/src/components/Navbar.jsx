import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

  
const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  return (
    <nav style={{direction: "rtl"}} className="navbar">
      <ul>
        {!token && (
          <li>
            <Link to="/login">דף הבית</Link>
          </li>
        )}

        {token && (
          <>
            {userRole=="owner"&&(<li>
              <Link to="/products">הזמנת סחורה</Link>
            </li>)}
            {userRole === "supplier" && (
              <li>
                <Link to="/ordersBySupplier">הזמנות של ספק</Link>
              </li>
            )}
            {userRole === "supplier" && (
              <li>
                <Link to="/addProduct">הוספת מוצר</Link>
              </li>
            )}
            {userRole === "owner" && (
              <li>
                <Link to="/ordersByOwner">הזמנות של מכולת</Link>
              </li>
            )}
            <li>
              <button className="logout-btn" onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login"); 
                // הפנייה לדף ההתחברות
              }}>
                התנתקות
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
