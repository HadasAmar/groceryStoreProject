import { copyWithStructuralSharing } from "@reduxjs/toolkit/query";
import axios from "axios";

const API_URL = "http://localhost:8080/orders"; // עדכן לפי הכתובת שלך

export const getOrdersBySupplierApi = async (token) => {
    console.log("token", token); // בודק אם הטוקן נשלח נכון
    try {
        const response = await axios.get(`${API_URL}/getOrdersSupplier`, {
            headers: { Authorization: `Bearer ${token}` } // שליחה של טוקן ב-Header
        });
        console.log("API response:", response); // בודק את התגובה שהתקבלה מהשרת
        return response.data;
    } catch (error) {
        console.error("Error fetching orders sss:", error); // בודק אם יש שגיאה בקריאה ל-API
        throw error; // זורק את השגיאה כדי לטפל בה בהמשך
    }
};

// פונקציה לקבלת הזמנות של בעל מכולת
export const getOrdersByStoreOwnerApi = async (token) => {
    try {
        console.log("getOrdersByStoreOwnerApi:", token); // בודק את התגובה שהתקבלה מהשרת
        const response = await axios.get(`${API_URL}/getOrdersOwner`, {
            headers: { Authorization: `Bearer ${token}` } // שליחה של טוקן ב-Header
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders owner:", error); // בודק אם יש שגיאה בקריאה ל-API
        throw error; // זורק את השגיאה כדי לטפל בה בהמשך
    }
};

// פונקציה לעדכון סטטוס ההזמנה של ספק
export const updateOrderStatusApi = async (orderId, status) => {
    console.log("orderId", orderId," status", status); // הוספת לוג
    const response = await axios.put(`${API_URL}/confirm/${orderId}`, { status });
    return response.data;
};

// פונקציה לעדכון סטטוס הזמנה של בעל מכולת לאחר קבלת סחורה
export const completeOrderApi = async (orderId) => {
    const response = await axios.put(`${API_URL}/complete/${orderId}`);
    return response.data;
};

// פונקציה ליצירת הזמנה חדשה
export const createOrderApi = async (orderData) => {
    const response = await axios.post(`${API_URL}/newOrder`, orderData);
    return response.data;
};
