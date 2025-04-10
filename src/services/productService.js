import { Product } from "../models/productModel.js";

export const getAllProducts = async () => {
  try {
    const products = await Product.find().lean();
    return products;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

export const getProductByCode = async (productCode) => {
  try {
    const product = await Product.findOne({ productCode });
    return product;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

export const createProduct = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      {
        new: true,
      }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};
