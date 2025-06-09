import type { Product, SortKey, SortOrder } from "../types";

interface SetAction {
  type: "SET_PRODUCTS";
  payload: {
    products: Product[];
    sortKey: SortKey;
    sortOrder: SortOrder;
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
  SetProducts: (
    products: Product[],
    sortKey: SortKey,
    sortOrder: SortOrder
  ): SetAction => ({
    type: "SET_PRODUCTS",
    payload: {
      products,
      sortKey,
      sortOrder,
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

function sortByKey(
  products: Product[],
  key: SortKey,
  order: SortOrder = "asc"
): Product[] {
  if (!key) return products;

  return [...products].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    let result = 0;

    if (typeof aVal === "string" && typeof bVal === "string") {
      result = aVal.localeCompare(bVal);
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      result = aVal - bVal;
    }

    return order === "asc" ? result : -result;
  });
}

export function productReducer(products: Product[], action: Action): Product[] {
  switch (action.type) {
    case "SET_PRODUCTS": {
      return sortByKey(
        action.payload.products,
        action.payload.sortKey,
        action.payload.sortOrder
      );
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
