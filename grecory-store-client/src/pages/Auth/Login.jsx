import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css"; // Assuming you have a CSS file for styling
const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2 className="login-title">ברוך הבא לדף ההתחברות</h2>
      <div className="login-buttons">
        <button
          className="login-button storeOwner"
          onClick={() => navigate("/OwnerLogin")}
        >
          התחברות בעל מכולת
        </button>
        <button
          className="login-button supplier"
          onClick={() => navigate("/SupplierLogin")}
        >
          התחברות ספק
        </button>
      </div>
    </div>
  );
};

export default Login;
