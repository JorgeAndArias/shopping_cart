import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "./Main";
import type { Product } from "../types";

test("display Add a product button", () => {
  const mockProducts: Product[] = [];

  render(
    <Main
      products={mockProducts}
      onSubmit={vi.fn()}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onAddToCart={vi.fn()}
    />
  );

  const addProductButton = screen.getByRole("button", {
    name: /Add a Product/i,
  });
  expect(addProductButton).toBeInTheDocument();
});

test("Display form when click 'Add a product' button", async () => {
  const mockProducts: Product[] = [];

  render(
    <Main
      products={mockProducts}
      onSubmit={vi.fn()}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onAddToCart={vi.fn()}
    />
  );

  const user = userEvent.setup();
  const addProductButton = screen.getByRole("button", {
    name: /Add a Product/i,
  });

  await user.click(addProductButton);

  expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: /price/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: /quantity/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
});

test("Remove form when click 'cancel' button in the form", async () => {
  const mockProducts: Product[] = [];

  render(
    <Main
      products={mockProducts}
      onSubmit={vi.fn()}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onAddToCart={vi.fn()}
    />
  );

  const user = userEvent.setup();
  const addProductButton = screen.getByRole("button", {
    name: /Add a Product/i,
  });

  await user.click(addProductButton);
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
  expect(screen.queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /cancel/i })
  ).not.toBeInTheDocument();
});
