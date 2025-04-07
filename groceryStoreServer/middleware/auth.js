import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // טוען משתנים מקובץ `.env` (כמו הסוד של ה-JWT)

export const authenticateToken = (req, res, next) => {
    console.log("😏")
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // שליפת ה-JWT
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // אימות ה-JWT
        req.user = verified; 
        console.log("req.user", req.user)
        next(); // מעבר לפונקציה הבאה
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        } else {
            return res.status(403).json({ message: "token." });
        }
    }
};

export const authorizeOwner = (req, res, next) => {
    console.log("enter authorizeOwner")
    if (req.user.role !== "owner") {
        return res.status(403).json({ message: "Access Denied. Only the store owner can access this." });
    }
    next();
};

export const authorizeSupplier = (req, res, next) => {
    if (req.user.role !== "supplier") {
        return res.status(403).json({ message: "Access Denied. Only suppliers can access this." });
    }
    console.log("enter authorizeSupplier")
    console.log("req.user", req.user)
    next();
};

