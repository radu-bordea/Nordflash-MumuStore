import Stripe from "stripe";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest) => {
  try {
    const { orderId, cartId } = await req.json();

    console.log("Payment route hit — orderId:", orderId, "cartId:", cartId);

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

    console.log("📦 Order:", order?.id, "isPaid:", order?.isPaid);
    console.log("🛒 Cart:", cart?.id, "items:", cart?.cartItems?.length);

    if (!order) {
      console.error("❌ Order not found:", orderId);
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    if (!cart) {
      console.error("❌ Cart not found:", cartId);
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    if (order.isPaid) {
      console.error("❌ Order already paid — isPaid is TRUE, schema default not applied");
      return Response.json({ error: "Order already paid" }, { status: 400 });
    }

    if (cart.cartItems.length === 0) {
      console.error("❌ Cart is empty");
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items = cart.cartItems.map((item) => {
      const isValidImageUrl =
        item.product.image?.startsWith("https://") ||
        item.product.image?.startsWith("http://");

      return {
        quantity: item.amount,
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            ...(isValidImageUrl && { images: [item.product.image] }),
          },
          unit_amount: Math.round(item.product.price * 100),
        },
      };
    });

    console.log("✅ Cart items count:", cart.cartItems.length);
    console.log("✅ Line items:", JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      metadata: { orderId, cartId },
      line_items,
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log("✅ Stripe session created:", session.id);

    return Response.json({ clientSecret: session.client_secret });

  } catch (error: any) {
    console.error("❌ Payment route error:", error?.message || error);
    return Response.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
};