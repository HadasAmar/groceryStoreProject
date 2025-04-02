// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
//   const [userType, setUserType] = useState(""); // סוג המשתמש - ספק או בעל מכולת
  const navigate = useNavigate();

//   const handleLogin = () => {
//     if (userType === "storeOwner") {
//       navigate("/auth/storeOwnerLogin");
//     } else if (userType === "supplier") {
//       navigate("/auth/supplierLogin");
//     }
//   };

  return (
    <div>
      <h2>ברוך הבא לדף ההתחברות</h2>
      <div>
        <button onClick={() => navigate("/auth/storeOwnerLogin")}>התחברות בעל מכולת</button>
        <button onClick={() => navigate("/SupplierLogin")}>התחברות ספק</button>
      </div>
      {/* <button onClick={handleLogin}>Proceed</button> */}
    </div>
  );
};

export default Login;
