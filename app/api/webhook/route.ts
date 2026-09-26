import Stripe from "stripe";
import { NextRequest } from "next/server";
import { fulfillOrder } from "@/utils/fulfillOrder";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      const cartId = session.metadata?.cartId;

      if (orderId && cartId && session.payment_status === "paid") {
        await fulfillOrder(orderId, cartId);
      }
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      const cartId = session.metadata?.cartId;

      if (orderId && cartId) {
        await fulfillOrder(orderId, cartId);
      }
    }
  } catch (error) {
    console.error("Webhook fulfillment error:", error);
    return Response.json({ error: "Fulfillment failed" }, { status: 500 });
  }

  return Response.json({ received: true });
};