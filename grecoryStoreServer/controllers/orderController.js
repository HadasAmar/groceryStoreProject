import { Order } from "../models/Order.js";

// צפייה בהזמנות של ספק
export const getOrdersBySupplier = async (req, res) => {
    try {
        const orders = await Order.find({ supplierId: req.user.id }); // מחפש רק הזמנות של הספק המחובר
        res.status(200).json(orders); // מחזיר את ההזמנות ללקוח
    } catch (error) {
        res.status(500).json({ message: error.message }); // אם יש שגיאה – מחזיר הודעה מתאימה
    }
};

// צפייה בהזמנות של בעל מכולת
export const getOrdersByStoreOwner = async (req, res) => {
    try {
        console.log("Getting orders for store owner...");
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// יצירת הזמנה
export const createOrder = async (req, res) => {
    const { supplierId, supplierName, items } = req.body;

    // בודקים אם יש מוצרים בהזמנה
    if (!items || items.length === 0) {
        return res.status(400).json({ message: "ההזמנה חייבת לכלול מוצרים" });
    }

    try { 
        // אם לא נתון סטטוס, שים את ברירת המחדל "ממתינה"
        const newOrder = new Order({
            supplierId,
            supplierName,
            items,
            status: "ממתינה",  // ברירת מחדל
        });

        // שומרים את ההזמנה
        await newOrder.save();

        // מחזירים את ההזמנה החדשה כתגובה
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// אישור קבלת הזמנה והעברתה לסטטוס "הושלמה"
export const completeOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = "הושלמה";
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// אישור הזמנה של ספק
export const confirmOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = "בתהליך";
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
