import axios from "axios";
import { cartSchema, addToCartResponseSchema } from "../types";

export const getCart = async () => {
  try {
    const { data } = await axios.get("/api/cart");
    return cartSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const addToCart = async (productId: string) => {
  try {
    const { data } = await axios.post("api/add-to-cart", { productId });
    return addToCartResponseSchema.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const cartCheckout = async () => {
  try {
    await axios.post("api/checkout");
  } catch (e) {
    console.error(e);
    throw e;
  }
};
