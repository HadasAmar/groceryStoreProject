import { Supplier } from "../models/Supplier.js";

// פונקציה להוספת מוצר חדש לספק
export const addProduct = async (req, res) => {
    console.log("Adding product..."); // הוספת לוג
    try {
        console.log("req",req)
        // שליפת הספק על פי ה-ID שבטוקן
        const supplier = await Supplier.findById(req.user.id);
        console.log("supplier",supplier); // הוספת לוג

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        // יצירת המוצר החדש מתוך הנתונים שנשלחו בבקשה
        const { name, price, minQuantity } = req.body;

        const newProduct = {
            name,
            price,
            minQuantity
        };

        // הוספת המוצר למערך המוצרים של הספק
        supplier.products.push(newProduct);

        // שמירת הספק עם המוצר החדש
        await supplier.save();

        // החזרת תשובה מוצלחת עם המוצר החדש
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message }); // במקרה של שגיאה
    }
};


// צפייה במוצרים של ספק מסוים
export const getProducts = async (req, res) => {

    try {
        // נמצא את הספק על פי ה-ID
        const supplier = await Supplier.findById(req.user.id);        
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        // מחזירים את המוצרים של הספק
        res.status(200).json(supplier.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
