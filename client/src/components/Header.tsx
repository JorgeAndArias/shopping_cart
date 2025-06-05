import { useEffect } from "react";
import Cart from "./Cart";
import type { CartItem } from "../types";

interface HeaderProps {
  cartItems: CartItem[];
  onCheckout: () => Promise<void>;
}

function Header({ cartItems, onCheckout }: HeaderProps) {
  useEffect(() => {}, []);

  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
    </header>
  );
}

export default Header;
