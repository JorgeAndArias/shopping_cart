import type { CartItem } from "../types";

interface CartItemProps {
  cartItems: CartItem[];
}

function CartRow({ cartItems }: CartItemProps) {
  return cartItems.map((item) => {
    return (
      <tr key={item._id}>
        <td>{item.title}</td>
        <td>{item.quantity}</td>
        <td>${item.price}</td>
      </tr>
    );
  });
}

export default CartRow;
