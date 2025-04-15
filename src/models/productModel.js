import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Availability must be an integer value",
      },
    },
    productCode: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for faster search
productSchema.index({ name: 1 });

export const Product = model("Product", productSchema);
