import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddForm from "./AddForm";

test("Check add product form has the necessary inputs", () => {
  render(
    <AddForm
      setShowAddProductForm={vi.fn()}
      onSubmit={vi.fn()}
    />
  );

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

test("Allows user to enter product details into the form", async () => {
  const user = userEvent.setup();

  render(
    <AddForm
      setShowAddProductForm={vi.fn()}
      onSubmit={vi.fn()}
    />
  );

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });

  await user.type(nameInput, "Testing Product");
  await user.type(priceInput, "10.50");
  await user.type(quantityInput, "1");

  expect(nameInput).toHaveValue("Testing Product");
  expect(priceInput).toHaveValue(10.5);
  expect(quantityInput).toHaveValue(1);
});
