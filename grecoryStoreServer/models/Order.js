import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    supplierName: { type: String, required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true }
    }],
    status: { type: String, enum: ["ממתינה", "בתהליך", "הושלמה"], default: "ממתינה" },
    createdAt: { type: Date, default: Date.now }
});
export const Order = model("Order", orderSchema);