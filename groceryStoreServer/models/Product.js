import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    minQuantity: { type: Number, required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true }
});
export const Product = model("Product", productSchema);

