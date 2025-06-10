import { z } from "zod";

export const productSchema = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().gte(0),
  price: z.number().gte(0),
});

export const newProductSchema = productSchema.omit({
  _id: true,
});

export const cartItemSchema = z.object({
  _id: z.string().min(1),
  productId: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().gte(0),
  price: z.number().gte(0),
});

export const productResponseSchema = z.array(productSchema);
export const cartSchema = z.array(cartItemSchema);

export const addToCartResponseSchema = z.object({
  product: productSchema,
  item: cartItemSchema,
});

export type Product = z.infer<typeof productSchema>;
export type NewProduct = z.infer<typeof newProductSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;

export type SortKey = "title" | "price" | "quantity" | null;
export type SortOrder = "asc" | "desc";

export interface Sort {
  key: SortKey;
  order: SortOrder;
}
