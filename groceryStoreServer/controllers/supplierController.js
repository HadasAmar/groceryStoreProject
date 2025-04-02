import { Supplier } from "../models/Supplier.js";
import { Order } from "../models/Order.js";
import jwt from "jsonwebtoken";

export const registerSupplier = async (req, res) => {
    console.log("Registering supplier...");
    console.log(req.body);

    const { companyName, phoneNumber, representativeName, password, products } = req.body;

    try {
        // יצירת ספק עם רשימת המוצרים ישירות בתוך המסמך
        const newSupplier = new Supplier({
            companyName,
            phoneNumber,
            representativeName,
            password,
            products  // כאן זה נשמר ישירות בתוך הספק
        });

        await newSupplier.save();

        const token = jwt.sign({ id: newSupplier._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// התחברות ספק קיים
export const loginSupplier = async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
        const supplier = await Supplier.findOne({ phoneNumber });
        if (!supplier || supplier.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: supplier._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSupplier = async (req, res) => {
    try {
        console.log("Getting suppliers...");
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

