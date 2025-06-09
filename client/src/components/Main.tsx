import type { Product, NewProduct } from "../types";
import AddForm from "./AddForm";
import ProductListing from "./ProductListing";
import { useState } from "react";

interface MainProps {
  products: Product[];
  onSubmit: (newProduct: NewProduct, callback?: () => void) => Promise<void>;
  onEdit: (updatedProduct: Product, callback?: () => void) => Promise<void>;
  onDelete: (productId: string, callback?: () => void) => Promise<void>;
  onAddToCart: (productId: string, callback?: () => void) => Promise<void>;
}

function Main({
  products,
  onSubmit,
  onEdit,
  onDelete,
  onAddToCart,
}: MainProps) {
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);

  const handleShowAddProductForm = () => {
    setShowAddProductForm(true);
  };

  return (
    <main>
      <ProductListing
        products={products}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddToCart={onAddToCart}
      />
      {!showAddProductForm && (
        <button onClick={handleShowAddProductForm}>Add a Product</button>
      )}
      {showAddProductForm && (
        <AddForm
          setShowAddProductForm={setShowAddProductForm}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
}

export default Main;
