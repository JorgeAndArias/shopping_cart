import { render, screen } from "@testing-library/react";
import Header from "./Header";
import type { CartItem } from "../types";

test("Check app main title", () => {
  const cartItems: CartItem[] = [
    {
      _id: "abc123",
      productId: "123abc",
      title: "Testing Product",
      quantity: 1,
      price: 100,
    },
  ]

  render (<Header cartItems={cartItems} onCheckout={vi.fn()}/>)

  const title = screen.getByRole("heading", { level: 1 });
  expect(title).toHaveTextContent("The Shop!");
})

test("Check app main title", () => {
  const cartItems: CartItem[] = [
    {
      _id: "abc123",
      productId: "123abc",
      title: "Testing Product",
      quantity: 1,
      price: 100,
    },
    {
      _id: "dfg456",
      productId: "456dfg",
      title: "Another Testing Product",
      quantity: 2,
      price: 50,
    },
  ]

  render (<Header cartItems={cartItems} onCheckout={vi.fn()}/>)

  screen.debug()
})