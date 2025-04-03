import { Router } from "express";
import {  getProducts } from "../controllers/productController.js";

const productRoute = Router();

productRoute.get('/getProducts', getProducts);

export default productRoute;
