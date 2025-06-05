import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import type { Product, NewProduct, CartItem } from "./types";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./services/product";
import { addToCart, cartCheckout, getCart } from "./services/cart";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    const fetchCartItems = async () => {
      const data = await getCart();
      setCartItems(data);
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const handleSubmit = async (
    newProduct: NewProduct,
    callback?: () => void
  ) => {
    try {
      const data = await createProduct(newProduct);
      setProducts((prev) => prev.concat(data));
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
      setProducts(
        products.map((product) => (product._id === data._id ? data : product))
      );

      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const handledDelete = async (productId: string, callback?: () => void) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));

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
      setProducts(products.map((p) => (p._id === product._id ? product : p)));

      if (cartItems.find((i) => i.productId === productId)) {
        setCartItems(
          cartItems.map((i) => (i.productId === productId ? item : i))
        );
      } else {
        setCartItems((prev) => prev.concat(item));
      }

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
      setCartItems([]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <Main
        products={products}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onDelete={handledDelete}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
