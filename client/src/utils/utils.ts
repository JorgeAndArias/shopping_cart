import type { CartItem } from "../types";

export const getCartTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );
};
