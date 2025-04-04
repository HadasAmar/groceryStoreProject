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

  // useMutation עם useMutation של הגרסה החדשה
  const mutation = useMutation({
    mutationFn: loginSupplierApi,  // כאן תכניס את הפונקציה שמבצעת את הקריאה ל-API
    onSuccess: (response) => {
      // Success callback - אחרי התחברות מוצלחת
      alert("Login successful! Token: " + response.token);
      localStorage.setItem("token", response.token); // שומר את הטוקן ב-localStorage
      localStorage.setItem("role", "supplier"); // שומר את סוג המשתמש ב-localStorage

      // הפנייה לדף אחר אחרי ההתחברות
      // navigate("/dashboard");
    },
    onError: (error) => {
      // Error callback - אם יש טעות
      alert("Error: " + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); // שולח את הנתונים ל-API
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">התחברות ספקים</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>מספר טלפון</label>
            <input
              type="number"
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

        {mutation.isLoading && <p className="loading-text">טוען...</p>}
        {mutation.isError && <p className="error-text">שגיאה: {mutation.error.message}</p>}
        {mutation.isSuccess && <p className="success-text">התחברות מוצלחת!</p>}
      </div>
    </div>
  );
};

export default SupplierLogin;
