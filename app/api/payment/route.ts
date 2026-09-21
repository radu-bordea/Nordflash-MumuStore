import Stripe from "stripe";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, cartId } = await req.json();

    if (!orderId || !cartId) {
      return Response.json({ error: "Missing orderId or cartId" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const [order, cart] = await Promise.all([
      prisma.order.findUnique({ where: { id: orderId } }),
      prisma.cart.findUnique({
        where: { id: cartId },
        include: { cartItems: { include: { product: true } } },
      }),
    ]);

    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }
    if (!cart) {
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }
    if (order.clerkId !== userId || cart.clerkId !== userId) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    if (order.isPaid) {
      return Response.json({ error: "Order already paid" }, { status: 400 });
    }
    if (cart.cartItems.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.cartItems.map((item) => {
        const isValidImageUrl =
          item.product.image?.startsWith("https://") ||
          item.product.image?.startsWith("http://");

        return {
          quantity: item.amount,
          price_data: {
            currency: "nok",
            product_data: {
              name: item.product.name,
              ...(isValidImageUrl && { images: [item.product.image] }),
            },
            // NOK is in øre (100 øre = 1 kr)
            unit_amount: Math.round(item.product.price * 100),
          },
        };
      });

    if (cart.shipping > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "nok",
          product_data: { name: "Frakt" },
          unit_amount: Math.round(cart.shipping * 100),
        },
      });
    }

    // Safety check: what Stripe will charge must equal the order total
    const stripeTotal = line_items.reduce(
      (sum, li) => sum + (li.price_data?.unit_amount ?? 0) * (li.quantity ?? 0),
      0
    );
    if (stripeTotal !== Math.round(order.orderTotal * 100)) {
      console.error("Total mismatch:", stripeTotal, order.orderTotal * 100);
      return Response.json(
        { error: "Totalen stemmer ikke. Gå tilbake til handlekurven og prøv igjen." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      locale: "nb",
      metadata: { orderId, cartId },
      line_items,
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Payment route error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
};