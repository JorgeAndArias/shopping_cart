import type { CartItem } from "../types";

interface SetAction {
  type: "SET_CART";
  payload: {
    items: CartItem[];
  };
}

interface UpdateAction {
  type: "UPDATE_CART";
  payload: {
    item: CartItem;
  };
}

interface CheckoutAction {
  type: "CHECKOUT_CART";
}

type CartAction = SetAction | UpdateAction | CheckoutAction;



// export function cartReducer(cart: CartItem[], action:CartAction) {
//   switch (action.type) {
//     case "AddProduct" {

//     }
//   }
// }
