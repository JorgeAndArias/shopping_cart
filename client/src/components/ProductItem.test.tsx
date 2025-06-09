import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductItem from "./ProductItem";
import type { Product } from "../types";

test("display Edit product button", () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  render(
    <ProductItem
      products={mockProducts}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onAddToCart={vi.fn()}
    />
  );

  const editProductButton = screen.getByRole("button", {
    name: /edit/i,
  });
  expect(editProductButton).toBeInTheDocument();
});

test("Display edit form when click edit product button", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  render(
    <ProductItem
      products={mockProducts}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onAddToCart={vi.fn()}
    />
  );

  const user = userEvent.setup();
  const editProductButton = screen.getByRole("button", {
    name: /edit/i,
  });

  await user.click(editProductButton);

  expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: /price/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: /quantity/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
});

test("Remove edit form when click 'cancel' button in the form", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  render(
    <ProductItem
      products={mockProducts}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onAddToCart={vi.fn()}
    />
  );

  const user = userEvent.setup();
  const editProductButton = screen.getByRole("button", {
    name: /edit/i,
  });

  await user.click(editProductButton);
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  await user.click(cancelButton);

  expect(
    screen.queryByRole("textbox", { name: /name/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("spinbutton", { name: /price/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("spinbutton", { name: /quantity/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /update/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /cancel/i })
  ).not.toBeInTheDocument();
});
