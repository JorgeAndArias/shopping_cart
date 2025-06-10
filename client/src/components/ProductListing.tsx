import type { Product, SortKey, SortOrder } from "../types";
import ProductItem from "./ProductItem";
import { SortButtons } from "./SortButton";

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
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <div className="product-sorting">
        <h3>Sort by:</h3>
        <div className="product-sorting-buttons">
          <SortButtons
            sortKey={sortKey}
            onSort={onProductSort}
            sortOrder={sortOrder}
          />
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
