import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginSupplierApi } from "../../api/supplierApi";
import "../../styles/SupplierLogin.css"// ייבוא קובץ CSS לעיצוב
import { Link } from "react-router-dom";

const SupplierLogin = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: ""
  });

  const mutation = useMutation({
    mutationFn: loginSupplierApi,  
    onSuccess: (response) => {
      localStorage.setItem("token", response.token); 
      localStorage.setItem("role", "supplier"); 
      window.location.href = "/ordersBySupplier";
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">התחברות ספקים</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>מספר טלפון</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>סיסמה</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="login2-button" disabled={mutation.isLoading}>
            התחבר
          </button>

          <Link className="to-register" to="/SupplierRegister"> עדיין לא רשום? הרשם כאן</Link>
        </form>

        {mutation.isError && <p className="error-text">שגיאה: {mutation.error}</p>}
        {mutation.isSuccess && <p className="success-text">התחברות מוצלחת!</p>}
      </div>
    </div>
  );
};

export default SupplierLogin;
