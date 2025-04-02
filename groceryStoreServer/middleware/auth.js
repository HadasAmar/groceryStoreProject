import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // טוען משתנים מקובץ `.env` (כמו הסוד של ה-JWT)

export const authenticate = (req, res, next) => {
    console.log("Authenticating user..."); // לוג לצורך דיבוג
    const token = req.header("Authorization")?.split(" ")[1]; // שליפת ה-JWT מהכותרת של הבקשה
    console.log("Token:", token); // לוג של הטוקן לצורך דיבוג

    if (!token) return res.status(401).json({ message: "Access Denied" }); // אם אין טוקן – מחזיר שגיאה 401

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // מאמת את ה-JWT עם המפתח הסודי
        req.user = verified; // שומר את פרטי המשתמש ב-req.user
        next(); // ממשיך הלאה לפונקציה הבאה
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" }); // אם הטוקן לא תקף – מחזיר שגיאה
    }
};
