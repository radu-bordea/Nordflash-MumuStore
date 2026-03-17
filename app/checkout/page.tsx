"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const cartId = searchParams.get("cartId");

  const fetchClientSecret = useCallback(async () => {
    if (!orderId || !cartId) {
      throw new Error("Missing orderId or cartId");
    }

    console.log("Fetching client secret for orderId:", orderId, "cartId:", cartId);

    const response = await axios.post("/api/payment", { orderId, cartId });

    if (!response.data?.clientSecret) {
      throw new Error("No client secret returned from server");
    }

    return response.data.clientSecret;
  }, [orderId, cartId]);

  if (!orderId || !cartId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Invalid checkout session. Please return to your cart.</p>
      </div>
    );
  }

  return (
    <div id="checkout" className="min-h-screen">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;