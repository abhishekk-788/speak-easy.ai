export const plansMap = [
  {
    id: "basic",
    name: "Basic",
    description: "Get started with SpeakEasy!",
    price: "199",
    items: ["3 Blog Posts", "3 Transcription"],
    paymentLink: "https://buy.stripe.com/test_14k9CXdac6hOcBGcMN",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QOU39SJbZyYDoZ5a4g22wWI"
        : "",
  },
  {
    id: "pro",
    name: "Pro",
    description: "All Blog Posts, let’s go!",
    price: "499",
    items: ["Unlimited Blog Posts", "Unlimited Transcriptions"],
    paymentLink: "https://buy.stripe.com/test_5kA8yTc68eOk1X25km",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QOU39SJbZyYDoZ53Q3K6dJA"
        : "",
  },
];

export const ORIGIN_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://speakeasy.ai.vercel.com";