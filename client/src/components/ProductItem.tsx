import type { Product } from "../types";
import { useState } from "react";
import EditForm from "./EditForm";

type ProductProps = {
  products: Product[];
  onEdit: (updatedProduct: Product, callback?: () => void) => Promise<void>;
  onDelete: (productId: string, callback?: () => void) => Promise<void>;
  onAddToCart: (productId: string, callback?: () => void) => Promise<void>;
};

function ProductItem({
  products,
  onEdit,
  onDelete,
  onAddToCart,
}: ProductProps) {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  return products.map((product) => {
    const isEditing = editingProductId === product._id;

    return (
      <li className="product" key={product._id}>
        <div className="product-details">
          <h3>{product.title}</h3>
          <p className="price">${product.price}</p>
          <p className="quantity">{product.quantity} left in stock</p>
          {!isEditing && (
            <div className="actions product-actions">
              <button
                className="add-to-cart"
                disabled={product.quantity <= 0}
                onClick={() => onAddToCart(product._id)}
              >
                Add to Cart
              </button>
              <button
                className="edit"
                onClick={() => setEditingProductId(product._id)}
              >
                Edit
              </button>
            </div>
          )}
          {isEditing && (
            <EditForm
              product={product}
              setEditingProductId={setEditingProductId}
              onEdit={onEdit}
            />
          )}
          <button
            className="delete-button"
            onClick={() => onDelete(product._id)}
          >
            <span>X</span>
          </button>
        </div>
      </li>
    );
  });
}

export default ProductItem;
