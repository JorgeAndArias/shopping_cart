import type { Sort, SortKey } from "../types";

interface SortAction {
  type: "SORT_PRODUCTS";
  payload: {
    key: SortKey;
  };
}

type Action = SortAction;

export const sortAction = {
  sortProducts: (key: SortKey): SortAction => ({
    type: "SORT_PRODUCTS",
    payload: {
      key,
    },
  }),
};

export const sortReducer = (sort: Sort, action: Action): Sort => {
  switch (action.type) {
    case "SORT_PRODUCTS": {
      if (sort.key === action.payload.key) {
        return {
          key: sort.key,
          order: sort.order === "asc" ? "desc" : "asc",
        };
      } else {
        return {
          key: action.payload.key,
          order: "asc",
        };
      }
    }
  }
};
