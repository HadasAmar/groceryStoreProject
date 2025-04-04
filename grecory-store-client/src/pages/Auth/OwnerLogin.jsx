import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "../../styles/SupplierLogin.css"// ייבוא קובץ CSS לעיצוב
// import { Link } from "react-router-dom";
import { loginOwnerApi } from "../../api/ownerApi";

const OwnerLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });

  // useMutation עם useMutation של הגרסה החדשה
  const mutation = useMutation({
    mutationFn: loginOwnerApi,  // כאן תכניס את הפונקציה שמבצעת את הקריאה ל-API
    onSuccess: (response) => {
      // Success callback - אחרי התחברות מוצלחת
      alert("Login successful! Token: " + response.token);
      localStorage.setItem("token", response.token); // שומר את הטוקן ב-localStorage
      localStorage.setItem("role", "owner"); // שומר את סוג המשתמש ב-localStorage

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
        <h2 className="login-title">התחברות בעל המכולת</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>שם בעל המכולת</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        </form>

        {mutation.isLoading && <p className="loading-text">טוען...</p>}
        {mutation.isError && <p className="error-text">שגיאה: {mutation.error.message}</p>}
        {mutation.isSuccess && <p className="success-text">התחברות מוצלחת!</p>}
      </div>
    </div>
  );
};

export default OwnerLogin;
