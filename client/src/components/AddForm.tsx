import { useState } from "react";
import type { NewProduct } from "../types";

interface AddFormProps {
  setShowAddProductForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddProductButton: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (newProduct: NewProduct, callback?: () => void) => Promise<void>;
}

function AddForm({
  setShowAddProductForm,
  setShowAddProductButton,
  onSubmit,
}: AddFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
    setShowAddProductForm(false);
    setShowAddProductButton(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: NewProduct = {
      title,
      price: parseInt(price, 10),
      quantity: parseInt(quantity, 10),
    };

    onSubmit(newProduct, resetForm);
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
