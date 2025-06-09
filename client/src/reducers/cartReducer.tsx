import type { CartItem } from "../types";

interface SetAction {
  type: "SET_CART";
  payload: {
    items: CartItem[];
  };
}

interface AddAction {
  type: "ADD_ITEM_TO_CART";
  payload: {
    item: CartItem;
  };
}

interface CheckoutAction {
  type: "CHECKOUT_CART";
}

type CartAction = SetAction | AddAction | CheckoutAction;

export const cartAction = {
  setCart: (items: CartItem[]): SetAction => ({
    type: "SET_CART",
    payload: {
      items,
    },
  }),
  addToCart: (item: CartItem): AddAction => ({
    type: "ADD_ITEM_TO_CART",
    payload: {
      item,
    },
  }),
  checkout: (): CheckoutAction => ({
    type: "CHECKOUT_CART",
  }),
};

export function cartReducer(cart: CartItem[], action: CartAction) {
  switch (action.type) {
    case "SET_CART": {
      return action.payload.items;
    }
    case "ADD_ITEM_TO_CART": {
      if (
        cart.find((item) => item.productId === action.payload.item.productId)
      ) {
        return cart.map((item) =>
          item.productId === action.payload.item.productId
            ? action.payload.item
            : item
        );
      } else {
        return cart.concat(action.payload.item);
      }
    }
    case "CHECKOUT_CART": {
      return [];
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error("Unhandled action: " + _exhaustiveCheck);
    }
  }
}
