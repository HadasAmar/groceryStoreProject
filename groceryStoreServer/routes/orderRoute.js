import { Router } from "express";
import { createOrder,getOrdersBySupplier, getOrdersByStoreOwner, confirmOrder, completeOrder } from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";

const orderRoute = Router();

// צפייה בהזמנות של ספק
orderRoute.get("/getOrdersSupplier",authenticate, getOrdersBySupplier);

// צפייה בהזמנות של בעל מכולת
orderRoute.get("/getOrdersOwner", getOrdersByStoreOwner);

// אישור הזמנה של ספק
orderRoute.put("/confirm/:id", confirmOrder);

// אישור קבלת הזמנה של בעל המכולת
orderRoute.put("/complete/:id", completeOrder);
orderRoute.post("/newOrder", createOrder);


export default orderRoute;
