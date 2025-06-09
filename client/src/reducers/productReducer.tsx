import type { Product } from "../types";

interface SetAction {
  type: "SET_PRODUCT";
  payload: {
    products: Product[];
  };
}

interface AddAction {
  type: "ADD_PRODUCT";
  payload: {
    product: Product;
  };
}

interface UpdateAction {
  type: "UPDATE_PRODUCT";
  payload: {
    product: Product;
  };
}

interface DeleteAction {
  type: "DELETE_PRODUCT";
  payload: {
    productId: string;
  };
}

type Action = SetAction | AddAction | UpdateAction | DeleteAction;

export const productAction = {
  SetProducts: (products: Product[]): SetAction => ({
    type: "SET_PRODUCT",
    payload: {
      products,
    },
  }),
  AddProduct: (product: Product): AddAction => ({
    type: "ADD_PRODUCT",
    payload: {
      product,
    },
  }),
  updateProduct: (product: Product): UpdateAction => ({
    type: "UPDATE_PRODUCT",
    payload: {
      product,
    },
  }),
  deleteProduct: (productId: string): DeleteAction => ({
    type: "DELETE_PRODUCT",
    payload: {
      productId,
    },
  }),
};

export function productReducer(products: Product[], action: Action): Product[] {
  switch (action.type) {
    case "SET_PRODUCT": {
      return action.payload.products;
    }
    case "ADD_PRODUCT": {
      return [...products, action.payload.product];
    }
    case "UPDATE_PRODUCT": {
      return products.map((product) =>
        product._id === action.payload.product._id
          ? action.payload.product
          : product
      );
    }
    case "DELETE_PRODUCT": {
      return products.filter(
        (product) => product._id !== action.payload.productId
      );
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw new Error("Unhandled action: " + _exhaustiveCheck);
    }
  }
}
