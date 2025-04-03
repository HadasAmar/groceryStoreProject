import { Router } from "express";
import { createOrder,getOrdersBySupplier, getOrdersByStoreOwner, confirmOrder, completeOrder } from "../controllers/orderController.js";
import { authenticateToken, authorizeOwner, authorizeSupplier } from "../middleware/auth.js";

const orderRoute = Router();

// צפייה בהזמנות של ספק
orderRoute.get("/getOrdersSupplier",authenticateToken, authorizeSupplier, getOrdersBySupplier);

// צפייה בהזמנות של בעל מכולת
orderRoute.get("/getOrdersOwner", authenticateToken, authorizeOwner, getOrdersByStoreOwner);

// אישור הזמנה של ספק
orderRoute.put("/confirm/:id", authenticateToken, authorizeSupplier,confirmOrder);

// אישור קבלת הזמנה של בעל המכולת
orderRoute.put("/complete/:id",authenticateToken, authorizeOwner, completeOrder);
orderRoute.post("/newOrder",authenticateToken, authorizeOwner, createOrder);


export default orderRoute;
