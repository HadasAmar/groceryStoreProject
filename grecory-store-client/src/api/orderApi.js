import { copyWithStructuralSharing } from "@reduxjs/toolkit/query";
import axios from "axios";

const API_URL = "http://localhost:8080/orders"; 

export const getOrdersBySupplierApi = async (token) => {
    console.log("token", token); 
    try {
        const response = await axios.get(`${API_URL}/getOrdersSupplier`, {
            headers: { Authorization: `Bearer ${token}` } 
        });
        console.log("API response:", response); 
        return response.data;
    } catch (error) {
        console.error("Error fetching orders sss:", error); 
        throw error; 
    }
};

// פונקציה לקבלת הזמנות של בעל מכולת
export const getOrdersByStoreOwnerApi = async (token) => {
    try {
        console.log("getOrdersByStoreOwnerApi:", token); 
        const response = await axios.get(`${API_URL}/getOrdersOwner`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching orders owner:", error); 
        throw error;
    }
};

// פונקציה ליצירת הזמנה חדשה
export const createOrderApi = async ({ orderData, token }) => {
    try {
        console.log("token",token); // הוספת לוג
        console.log("orderData", orderData); // הוספת לוג
        const response = await axios.post(`${API_URL}/newOrder`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error); // הוספת לוג
        throw error; 
    };
}

// פונקציה לעדכון סטטוס ההזמנה של ספק
export const updateOrderStatusApi = async ({orderId, status, token}) => {
    try {
        console.log("orderId:", orderId, "status:", status, "token:", token); // הוספת לוג
        const response = await axios.put(
            `${API_URL}/confirm/${orderId}`,
            { status }, 
            {
                headers: {
                    Authorization: `Bearer ${token}` // הוספת הטוקן לכותרת
                }
            }
        );
        return response.data; 
    } catch (error) {
        console.error("שגיאה בעדכון סטטוס ההזמנה:", error); 
        throw error; 
    }
};


// פונקציה לעדכון סטטוס הזמנה של בעל מכולת לאחר קבלת סחורה
export const completeOrderApi = async ({orderId, status, token}) => {
    try {
        console.log("Completing order:", orderId, "token:", token);
        const response = await axios.put(
            `${API_URL}/complete/${orderId}`,
            {status},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error completing order:", error);
        throw error;
    }
};



