import { Router } from "express";
import { handleStockData } from "../controllers/stockController.js";

const stockRoute = Router();

// אין צורך באימות כי זה מגיע מהקופה, אפשר להוסיף אימות לפי הצורך
stockRoute.post("/handleStockData", handleStockData);

export default stockRoute;
