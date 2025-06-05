import axios from "axios";
import {
  productSchema,
  productResponseSchema,
  type NewProduct,
  type Product,
} from "../types";

export const getProducts = async () => {
  try {
    const { data } = await axios.get("/api/products");
    return productResponseSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createProduct = async (newProduct: NewProduct) => {
  try {
    const { data } = await axios.post("/api/products", { ...newProduct });
    return productSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateProduct = async (
  productId: string,
  updatedProduct: Product
) => {
  try {
    const { data } = await axios.put(`/api/products/${productId}`, {
      ...updatedProduct,
    });
    return productSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await axios.delete(`/api/products/${productId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
