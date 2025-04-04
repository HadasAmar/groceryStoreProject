import axios from "axios";

const API_URL = "http://localhost:8080/products";  // כתובת ה-API שלך

// פונקציה לשליפת המוצרים הקיימים של הספק
export const getProductsApi = async (token) => {
    try {
        console.log("getProductsApi:", token); // הוספת לוג
        const response = await axios.get(`${API_URL}/getProducts`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("after getProductsApi:", response); // הוספת לוג
        return response.data;  // מחזיר את רשימת המוצרים
    } catch (error) {
        throw new Error(error.response?.data?.message || "שגיאה בטעינת המוצרים");
    }
};

// פונקציה להוספת מוצר חדש
export const addProductApi = async (productData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/addProduct`, productData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "שגיאה בהוספת המוצר");
    }
};
