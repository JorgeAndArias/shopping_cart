import { useState } from "react";
import type { Product } from "../types";

interface EditFormProps {
  product: Product;
  setEditingProductId: React.Dispatch<React.SetStateAction<string | null>>;
  onEdit: (updatedProduct: Product, callback?: () => void) => Promise<void>;
}

function EditForm({ product, setEditingProductId, onEdit }: EditFormProps) {
  const [currentProduct, setCurrentProduct] = useState<Product>(product);

  const resetForm = () => {
    setEditingProductId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(currentProduct, resetForm);
  };

  const set = (name: keyof Product) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCurrentProduct((oldValues) => ({
        ...oldValues,
        [name]: value,
      }));
    };
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={currentProduct.title}
            aria-label="Product Name"
            onChange={set("title")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={currentProduct.price}
            aria-label="Product Price"
            onChange={set("price")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={currentProduct.quantity}
            aria-label="Product Quantity"
            onChange={set("quantity")}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
