import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditForm from "./EditForm";
import type { Product } from "../types";

test("Check edit product form has the necessary inputs", () => {
  const mockProduct: Product = {
    _id: "12345abcd",
    title: "My test",
    quantity: 10,
    price: 10,
  };

  render(
    <EditForm
      product={mockProduct}
      setEditingProductId={vi.fn()}
      onEdit={vi.fn()}
    />
  );

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

test("Check initial form values match editing product", () => {
  const mockProduct: Product = {
    _id: "12345abcd",
    title: "My test",
    quantity: 10,
    price: 10,
  };

  render(
    <EditForm
      product={mockProduct}
      setEditingProductId={vi.fn()}
      onEdit={vi.fn()}
    />
  );

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });

  expect(nameInput).toHaveValue("My test");
  expect(priceInput).toHaveValue(10);
  expect(quantityInput).toHaveValue(10);
});

test("Allows user to edit the product details in the form", async () => {
  const mockProduct: Product = {
    _id: "12345abcd",
    title: "My test",
    quantity: 10,
    price: 10,
  };

  const user = userEvent.setup();

  render(
    <EditForm
      product={mockProduct}
      setEditingProductId={vi.fn()}
      onEdit={vi.fn()}
    />
  );

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });

  await user.clear(nameInput);
  await user.type(nameInput, "Testing Product");

  await user.clear(priceInput);
  await user.type(priceInput, "10.50");

  await user.clear(quantityInput);
  await user.type(quantityInput, "1");

  expect(nameInput).toHaveValue("Testing Product");
  expect(priceInput).toHaveValue(10.5);
  expect(quantityInput).toHaveValue(1);
});
