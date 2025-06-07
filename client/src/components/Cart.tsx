import type { CartItem } from "../types";
import { getCartTotal } from "../utils/utils";
import CartRow from "./CartRow";

interface CartProps {
  cartItems: CartItem[];
  onCheckout: () => Promise<void>;
}

function Cart({ cartItems, onCheckout }: CartProps) {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
          {/* <button className="checkout" disabled>
            Checkout
          </button> */}
        </>
      ) : (
        <>
          <table className="cart-items">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <CartRow cartItems={cartItems} />
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="total">
                  Total: ${getCartTotal(cartItems)}
                </td>
              </tr>
            </tfoot>
          </table>
          {/* <div className="checkout-button">
            <button className="checkout" onClick={onCheckout}>
              Checkout
            </button>
          </div> */}
        </>
      )}
      <div className="checkout-button">
        <button className="checkout" onClick={onCheckout} disabled={cartItems.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
