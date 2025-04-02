import { Router } from "express";
import express from "express";
import { registerSupplier, loginSupplier, getSupplier } from "../controllers/supplierController.js";

const supplierRoute = Router();

// רישום ספק חדש
supplierRoute.post("/register", registerSupplier);

// התחברות ספק
supplierRoute.post("/login", loginSupplier);

//קבלת ספקים
supplierRoute.get("/getSupplier", getSupplier);



export default supplierRoute;
