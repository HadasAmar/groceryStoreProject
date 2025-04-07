import { Router } from "express";
import { loginOwner } from "../controllers/ownerController.js";


const ownerRoute = Router();

// רישום ספק חדש
ownerRoute.post("/login", loginOwner);




export default ownerRoute;
