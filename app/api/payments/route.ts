import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payment-helper";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  //webhook functionality
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  // console.log("Received payload:", payload);
  // console.log("Received signature:", sig);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("Constructed event:", event);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        console.log("Handling checkout.session.completed event");
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        console.log("Retrieved session:", session);

        //connect to the db create or update user
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      }
      case "customer.subscription.deleted": {
        console.log("Handling customer.subscription.deleted event");
        // connect to db
        const subscriptionId = event.data.object.id;
        console.log("Subscription ID:", subscriptionId);

        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json({
      status: "success",
    });
  } catch (err) {
    console.error("Error processing webhook event", err);
    return NextResponse.json({ status: "Failed", err });
  }
}
