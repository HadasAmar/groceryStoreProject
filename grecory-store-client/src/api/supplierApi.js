import axios from "axios";

const API_URL = "http://localhost:8080/suppliers";

export const registerSupplierApi = async (supplierData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, supplierData);
        console.log("Registration response:", response.data); // הוספת לוג
        return response.data; // מחזיר את הטוקן או מידע אחר
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

export const loginSupplierApi = async (supplierData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, supplierData);
        console.log("Login response:", response.data); // הוספת לוג
        return response.data; // מחזיר את הטוקן או מידע אחר
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

export const getSuppliersApi = async (token) => {
    try {
        console.log("Get suppliers:", token); // הוספת לוג
        const response = await axios.get(`${API_URL}/getSupplier`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("after Get suppliers:", response); // הוספת לוג
        return response.data; // מחזיר את הטוקן או מידע אחר
    } catch (error) {
        throw error.response?.data?.message || "get failed";
    }
};
