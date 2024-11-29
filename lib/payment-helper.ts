/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import Stripe from "stripe";
import getDbConnection from "./db";
import { currentUser } from "@clerk/nextjs/server";
import { getPlanType } from "./user-helper";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    console.log("Retrieving subscription with ID:", subscriptionId);
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log("Retrieved subscription:", subscription);

    const sql = await getDbConnection();
    console.log("Database connection established");

    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
    console.log(
      "Updated user status to 'cancelled' for customer_id:",
      subscription.customer
    );
  } catch (error) {
    console.error("Error handling subscription deletion", error);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const clerkUser = await currentUser();
  const userId = clerkUser?.id;
  console.log("Handle Checkout Session Started for user: " + clerkUser?.id);

  const customerId = session.customer as string;
  console.log("Customer ID:", customerId);

  const customer = await stripe.customers.retrieve(customerId);
  console.log("Retrieved customer:", customer);

  const priceId = session.line_items?.data[0].price?.id;
  console.log("Price ID:", priceId);

  const sql = await getDbConnection();
  console.log("Database connection established");

  if ("email" in customer && priceId) {
    console.log("Customer email and price ID are valid");
    await createOrUpdateUser(sql, customer, customerId, userId);
    await updateUserSubscription(sql, priceId, customer.email as string);
    await insertPayment(sql, session, priceId, customer.email as string);
  } else {
    console.log("Customer email or price ID is invalid");
  }
}

export async function checkUserSubscription() {
  console.log("checkUserSubscription called");

  const clerkUser = await currentUser();
  console.log("clerkUser:", clerkUser);

  const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";
  console.log("email:", email);

  try {
    const sql = await getDbConnection();
    if (email) {
      const user = await sql`SELECT * FROM users WHERE email=${email}`;
      console.log("SQL query result:", user);

      if (user.length == 0) {
        console.log("No user found, returning 'starter'");
        return "starter" as string;
      } else {
        console.log("Fetch from users DB", user);
        const planType = getPlanType(user[0].price_id);
        console.log("planType:", planType);
        return planType.id;
      }
    }
  } catch (error) {
    console.error("Error checking user subscription:", error);
    console.log({
      title:
        "An error occurred while checking your subscription. Please try again.",
    });
    return null;
  }
}

async function insertPayment(
  sql: any,
  session: Stripe.Checkout.Session,
  priceId: string,
  customerEmail: string
) {
  try {
    console.log("Inserting payment for customer email:", customerEmail);
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${session.amount_total}, ${session.status}, ${session.id}, ${priceId}, ${customerEmail})`;
    console.log("Payment inserted successfully");
  } catch (err) {
    console.error("Error in inserting payment", err);
  }
}

async function createOrUpdateUser(
  sql: any,
  customer: Stripe.Customer,
  customerId: string,
  userId: string | undefined
) {
  try {
    console.log("Checking if user exists with email:", customer.email, userId);
    const user = await sql`SELECT * FROM users WHERE email = ${customer.email}`;
    if (user.length === 0) {
      console.log("User does not exist, creating new user");
      await sql`INSERT INTO users (email, full_name, customer_id, user_id) VALUES (${customer.email}, ${customer.name}, ${customerId}, ${userId})`;
      console.log("User created successfully");
    } else {
      console.log("User already exists");
    }
  } catch (err) {
    console.error("Error in inserting user", err);
  }
}

async function updateUserSubscription(
  sql: any,
  priceId: string,
  email: string
) {
  try {
    console.log("Updating user subscription for email:", email);
    await sql`UPDATE users SET price_id = ${priceId}, status = 'active' where email = ${email}`;
    console.log("User subscription updated successfully");
  } catch (err) {
    console.error("Error in updating user", err);
  }
}
