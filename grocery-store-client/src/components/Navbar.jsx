import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">בית</Link>
        </li>
        <li>
          <Link to="/login">התחברות</Link>
        </li>
        <li>
          <Link to="/products"> מוצרים</Link>
        </li>
        <li>
          <Link to="/ordersBySupplier"> הזמנות של ספק</Link>
        </li>
        <li>
          <Link to="/ordersByOwner"> הזמנות של מכולת</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
