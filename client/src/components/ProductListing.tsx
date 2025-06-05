import type { Product } from "../types";
import ProductItem from "./ProductItem";

interface ProductListingProps {
  products: Product[];
  onEdit: (updatedProduct: Product, callback?: () => void) => Promise<void>;
  onDelete: (productId: string, callback?: () => void) => Promise<void>;
  onAddToCart: (productId: string, callback?: () => void) => Promise<void>;
}

function ProductListing({
  products,
  onEdit,
  onDelete,
  onAddToCart,
}: ProductListingProps) {
  return (
    <div className="product-listing">
      <h2>Products</h2>
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
