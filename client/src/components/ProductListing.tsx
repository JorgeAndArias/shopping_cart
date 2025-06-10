import type { Product, SortKey, SortOrder } from "../types";
import ProductItem from "./ProductItem";

interface ProductListingProps {
  products: Product[];
  onEdit: (updatedProduct: Product, callback?: () => void) => Promise<void>;
  onDelete: (productId: string, callback?: () => void) => Promise<void>;
  onAddToCart: (productId: string, callback?: () => void) => Promise<void>;
  sortKey: SortKey;
  sortOrder: SortOrder;
  onProductSort: (key: SortKey) => void;
}

function ProductListing({
  products,
  onEdit,
  onDelete,
  onAddToCart,
  sortKey,
  sortOrder,
  onProductSort,
}: ProductListingProps) {
  const getArrow = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="product-listing">
      <h2>Products</h2>
      <div className="product-sorting">
        <h3>Sort by:</h3>
        <div className="product-sorting-buttons">
          <button
            className={sortKey === "title" ? "active" : ""}
            onClick={() => onProductSort("title")}
          >
            Name{getArrow("title")}
          </button>
          <button
            className={sortKey === "price" ? "active" : ""}
            onClick={() => onProductSort("price")}
          >
            Price{getArrow("price")}
          </button>
          <button
            className={sortKey === "quantity" ? "active" : ""}
            onClick={() => onProductSort("quantity")}
          >
            Quantity{getArrow("quantity")}
          </button>
          <button
            className={!sortKey ? "active" : ""}
            onClick={() => onProductSort(null)}
          >
            Reset
          </button>
        </div>
      </div>

      <ul className="product-list">
        <ProductItem
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
        />
      </ul>
    </div>
  );
}

export default ProductListing;
