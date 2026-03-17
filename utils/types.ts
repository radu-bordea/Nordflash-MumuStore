import { Prisma } from "@/app/generated/prisma/client";

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;

export type actionFunction = (
  prevState: unknown,
  formData: FormData,
) => Promise<{ message: string }>;

// For actions that redirect instead of returning a message
export type redirectActionFunction = (
  prevState: unknown,
  formData: FormData,
) => Promise<{ message: string } | void>;

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: true;
  orderTotal: number;
};