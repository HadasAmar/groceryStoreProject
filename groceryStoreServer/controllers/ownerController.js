import { reactHooksModuleName } from "@reduxjs/toolkit/query/react";
import jwt from "jsonwebtoken";

export const loginOwner = async (req, res) => {
    const { name, password } = req.body;

    try {
        // בדיקה אם המשתמש הוא בעל החנות לפי הנתונים ב-.env
        if (name !== process.env.OWNER_NAME || password !== process.env.OWNER_PASSWORD) {
            return res.status(400).json({ message: "One of the details is incorrect, please try again" });
        }

        // יצירת טוקן עם תפקיד של בעל חנות
        const token = jwt.sign({ role: "owner" }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({ token, role: "owner" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

