import { useState, useEffect, useReducer } from "react";
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
import { productReducer, productAction } from "./reducers/productReducer";

function App() {
  const [products, productsDispatch] = useReducer(productReducer, []);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      productsDispatch(productAction.SetProducts(data));
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
        onDelete={handleDelete}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
