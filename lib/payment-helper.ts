/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import getDbConnection from "./db";

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
  console.log("Handle Checkout Session Started");
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
    await createOrUpdateUser(sql, customer, customerId);
    await updateUserSubscription(sql, priceId, customer.email as string);
    await insertPayment(sql, session, priceId, customer.email as string);
  } else {
    console.log("Customer email or price ID is invalid");
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
  customerId: string
) {
  try {
    console.log("Checking if user exists with email:", customer.email);
    const user = await sql`SELECT * FROM users WHERE email = ${customer.email}`;
    if (user.length === 0) {
      console.log("User does not exist, creating new user");
      await sql`INSERT INTO users (email, full_name, customer_id) VALUES (${customer.email}, ${customer.name}, ${customerId})`;
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
