import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import type { Product, NewProduct, SortKey, SortOrder } from "./types";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./services/product";
import { addToCart, cartCheckout, getCart } from "./services/cart";
import { productReducer, productAction } from "./reducers/productReducer";
import { cartAction, cartReducer } from "./reducers/cartReducer";

function App() {
  const [products, productsDispatch] = useReducer(productReducer, []);
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      productsDispatch(productAction.SetProducts(data, sortKey, sortOrder));
    };

    const fetchCartItems = async () => {
      const data = await getCart();
      cartDispatch(cartAction.setCart(data));
    };

    fetchProducts();
    fetchCartItems();
  }, [sortKey, sortOrder]);

  const handleSubmit = async (
    newProduct: NewProduct,
    callback?: () => void
  ) => {
    try {
      const data = await createProduct(newProduct);
      productsDispatch(productAction.AddProduct(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleEdit = async (updatedProduct: Product, callback?: () => void) => {
    try {
      const data = await updateProduct(updatedProduct._id, updatedProduct);
      productsDispatch(productAction.updateProduct(data));

      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleDelete = async (productId: string, callback?: () => void) => {
    try {
      await deleteProduct(productId);
      productsDispatch(productAction.deleteProduct(productId));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleAddToCart = async (productId: string, callback?: () => void) => {
    try {
      const { product, item } = await addToCart(productId);

      productsDispatch(productAction.updateProduct(product));
      cartDispatch(cartAction.addToCart(item));

      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleCheckout = async () => {
    try {
      await cartCheckout();
      cartDispatch(cartAction.checkout());
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handleProductSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <Main
        products={products}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddToCart={handleAddToCart}
        onProductSort={handleProductSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
    </div>
  );
}

export default App;
