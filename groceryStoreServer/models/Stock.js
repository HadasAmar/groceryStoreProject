import { Schema, model } from "mongoose";

const stockSchema = new Schema({
    name: { type: String, required: true, unique: true }, // שם המוצר (כמו ב-JSON)
    quantity: { type: Number, required: true },            // כמות נוכחית בחנות
    minQuantity: { type: Number, required: true }          // מינימום רצוי
});

export const Stock = model("Stock", stockSchema);
