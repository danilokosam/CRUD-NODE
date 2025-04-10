import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    availability: Number,
    productCode: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model("Product", productSchema);
