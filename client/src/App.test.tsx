import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/product";
import { getCart, addToCart, cartCheckout } from "./services/cart";
import type { CartItem, Product } from "./types";

vi.mock("./services/product");
vi.mock("./services/cart");

const mockedGetProducts = vi.mocked(getProducts);
const mockedCreateProduct = vi.mocked(createProduct);
const mockedUpdateProduct = vi.mocked(updateProduct);
const mockedDeleteProduct = vi.mocked(deleteProduct);
const mockedGetCart = vi.mocked(getCart);
const mockedAddToCart = vi.mocked(addToCart);
const mockedCartCheckout = vi.mocked(cartCheckout);

beforeEach(() => {
  vi.restoreAllMocks();
});

test("Product is display on initial render", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
    {
      _id: "6789efgh",
      title: "My Second test",
      quantity: 15,
      price: 5,
    },
  ];

  const mockCart: CartItem[] = [];

  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCart.mockResolvedValue(mockCart);

  render(<App />);

  for (const product of mockProducts) {
    expect(
      await screen.findByRole("heading", { name: product.title })
    ).toBeInTheDocument();
  }
});

test("Deleting the product removes the product", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  const mockCart: CartItem[] = [];
  const user = userEvent.setup();
  const mockProduct = mockProducts[0];

  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCart.mockResolvedValue(mockCart);
  mockedDeleteProduct.mockResolvedValue(undefined);

  render(<App />);

  const deleteButton = await screen.findByRole("button", { name: /X/ });
  await user.click(deleteButton);

  await waitFor(() => {
    expect(
      screen.queryByRole("heading", { name: mockProduct.title })
    ).not.toBeInTheDocument();
  });
});

test("Submiiting the edit form updates the product", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  const mockProduct = mockProducts[0];

  const mockUpdatedProduct = {
    _id: "12345abcd",
    title: "My new test",
    quantity: 10,
    price: 10,
  };

  const mockCart: CartItem[] = [];
  const user = userEvent.setup();

  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCart.mockResolvedValue(mockCart);
  mockedUpdateProduct.mockResolvedValue(mockUpdatedProduct);

  render(<App />);

  await waitFor(() => {
    expect(
      screen.queryByRole("heading", { name: mockProduct.title })
    ).toBeInTheDocument();
  });

  const editButton = screen.getByRole("button", { name: /edit/i });
  await user.click(editButton);

  const updateButton = screen.getByRole("button", { name: /update/i });
  await user.click(updateButton);

  expect(
    screen.queryByRole("heading", { name: mockUpdatedProduct.title })
  ).toBeInTheDocument();
});

test("Updating the product closes the form", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  const mockCart: CartItem[] = [];
  const user = userEvent.setup();

  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCart.mockResolvedValue(mockCart);

  render(<App />);

  const editButton = await screen.findByRole("button", { name: /edit/i });
  await user.click(editButton);

  expect(
    screen.getByRole("textbox", { name: /product name/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: /price/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: /quantity/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();

  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  await user.click(cancelButton);

  expect(
    screen.queryByRole("textbox", { name: /product name/i })
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

test("Adding the product closes the form and product appears", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  const mockCart: CartItem[] = [];
  const user = userEvent.setup();
  const mockNewProduct: Product = {
    _id: "xyz789",
    title: "My new product test",
    quantity: 10.5,
    price: 1,
  };

  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCart.mockResolvedValue(mockCart);
  mockedCreateProduct.mockResolvedValue(mockNewProduct);

  render(<App />);

  const addProductButton = await screen.findByRole("button", {
    name: "Add a Product",
  });
  await user.click(addProductButton);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });

  await user.type(nameInput, "My new product test");
  await user.type(priceInput, "10.50");
  await user.type(quantityInput, "1");

  const addButton = screen.getByRole("button", {
    name: "Add",
  });

  await user.click(addButton);

  expect(addButton).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: mockNewProduct.title })
  ).toBeInTheDocument();
});

test("Adding to cart creates cart Item", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  const mockCart: CartItem[] = [];
  const user = userEvent.setup();
  const mockAddToCartResponse = {
    product: {
      _id: "12345abcd",
      title: "My test",
      quantity: 9,
      price: 10,
    },
    item: {
      _id: "cart123abc",
      productId: "12345abcd",
      title: "My test",
      quantity: 1,
      price: 10,
    },
  };

  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCart.mockResolvedValue(mockCart);
  mockedAddToCart.mockResolvedValue(mockAddToCartResponse);

  render(<App />);

  const addToCart = await screen.findByRole("button", {
    name: "Add to Cart",
  });

  await user.click(addToCart);

  expect(screen.getByRole("row", { name: /item/i })).toBeInTheDocument();
  expect(screen.getByRole("row", { name: /my test/i })).toBeInTheDocument();
  expect(screen.getByRole("row", { name: /quantity/i })).toBeInTheDocument();
  expect(screen.getByRole("row", { name: /price/i })).toBeInTheDocument();
  expect(screen.getByRole("row", { name: /total: \$10/i })).toBeInTheDocument();
});

test("Checkout removes cart items", async () => {
  const mockProducts: Product[] = [
    {
      _id: "12345abcd",
      title: "My test",
      quantity: 10,
      price: 10,
    },
  ];

  const mockCart: CartItem[] = [
    {
      _id: "cart123abc",
      productId: "12345abcd",
      title: "My test",
      quantity: 1,
      price: 10,
    },
  ];

  const user = userEvent.setup();

  mockedGetProducts.mockResolvedValue(mockProducts);
  mockedGetCart.mockResolvedValue(mockCart);
  mockedCartCheckout.mockResolvedValue(undefined);

  render(<App />);

  const checkoutButton = await screen.findByRole("button", {
    name: /checkout/i,
  });

  await user.click(checkoutButton);

  const emptyMsg = await screen.findByText(/your cart is empty/i);
  expect(emptyMsg).toBeInTheDocument();
});
