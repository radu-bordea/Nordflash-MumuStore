import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    if (!orderId || !cartId) {
      throw new Error("Missing metadata");
    }

    if (session.status === "complete") {
      // ✅ get cart items again
      const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
          cartItems: {
            include: { product: true },
          },
        },
      });

      if (!cart) throw new Error("Cart not found");

      // ✅ reduce stock HERE (safe)
      for (const item of cart.cartItems) {
        if (item.amount > item.product.stock) {
          throw new Error(`Produkt ${item.product.name} er utsolgt`);
        }

        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.amount,
            },
          },
        });
      }

      // ✅ mark order paid
      await prisma.order.update({
        where: { id: orderId },
        data: { isPaid: true },
      });

      // ✅ delete cart AFTER success
      await prisma.cart.delete({
        where: { id: cartId },
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json(null, { status: 500 });
  }

  redirect("/orders");
};