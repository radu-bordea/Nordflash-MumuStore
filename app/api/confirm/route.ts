import Stripe from "stripe";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
   import { fulfillOrder } from "@/utils/fullfillOrder";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return Response.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    if (!orderId || !cartId) throw new Error("Missing metadata");

    if (session.payment_status === "paid") {
      await fulfillOrder(orderId, cartId);
    }
  } catch (error) {
    console.error(error);
    return Response.json(null, { status: 500 });
  }

  redirect("/orders");
};