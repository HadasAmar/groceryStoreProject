import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

  
const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  // כל פעם שה־token או ה־role משתנים, מעדכנים את ה־state
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    setToken(storedToken);
    setRole(storedRole);
  }, []); // זה ירוץ רק פעם אחת כאשר הקומפוננטה נטענת, ואם 
  return (
    <nav style={{direction: "rtl"}} className="navbar">
      <ul>
        {/* קישור להתחברות תמיד מוצג אם אין טוקן */}
        {!token && (
          <li>
            <Link to="/login">דף הבית</Link>
          </li>
        )}

        {/* הצגת קישורים בהתאם לתפקיד המשתמש */}
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
