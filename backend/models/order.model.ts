import { ObjectId } from "mongodb";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim:true  },
    products: { type:Array, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, trim: true },
    shipped: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

export {};
