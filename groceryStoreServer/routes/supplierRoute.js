import { Router } from "express";
import express from "express";
import { registerSupplier, loginSupplier, getSupplier } from "../controllers/supplierController.js";
import { authorizeOwner, authenticateToken } from "../middleware/auth.js";

const supplierRoute = Router();

// רישום ספק חדש
supplierRoute.post("/register", registerSupplier);

// התחברות ספק
supplierRoute.post("/login", loginSupplier);

//קבלת ספקים
supplierRoute.get("/getSupplier",authenticateToken, authorizeOwner, getSupplier);


export default supplierRoute;
