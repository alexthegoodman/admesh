import { PrismaClient } from "@prisma/client";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export default async function webhook(request: any, response: any) {
  let event = request.body;
  // Replace this endpoint secret with your endpoint's unique secret
  // If you are testing with the CLI, find the secret by running 'stripe listen'
  // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  // at https://dashboard.stripe.com/webhooks
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET
    ? process.env.STRIPE_ENDPOINT_SECRET
    : "whsec_3fbf14f62eaa35883c681634b8fc84adf85557448504e3b8244198adbebbe07e";
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse

  console.info("endpointSecret", endpointSecret);

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  let subscription;
  let status;
  // Handle the event
  switch (event.type) {
    case "customer.subscription.trial_will_end":
      subscription = event.data.object;
      status = subscription.status;
      console.log(
        `Subscription trial will end. Subscription status is ${status}.`
      );
      // Then define and call a method to handle the subscription trial ending.
      // handleSubscriptionTrialEnding(subscription);
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription deleted. Subscription status is ${status}.`);
      console.info("subscription", subscription);
      // Then define and call a method to handle the subscription deleted.
      // handleSubscriptionDeleted(subscriptionDeleted);
      break;
    case "customer.subscription.created":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription created. Subscription status is ${status}.`);
      console.info("subscription customer", subscription.customer);

      const customer = await stripe.customers.retrieve(subscription.customer);

      console.info("customer data", customer);

      // TODO: what if user signs up with a different email than the one they used for stripe?

      const relatedUser = await prisma.user.findFirst({
        where: {
          email: customer.email,
        },
      });

      console.info("relatedUser", relatedUser);

      if (relatedUser) {
        await prisma.user.update({
          where: {
            id: relatedUser.id,
          },
          data: {
            stripeCustomerId: customer.id,
            stripeSubscriptionId: subscription.id,
            plan: "PRO",
          },
        });

        console.info("plan updated and stripe data saved");
      }

      // Then define and call a method to handle the subscription created.
      // handleSubscriptionCreated(subscription);
      break;
    case "customer.subscription.updated":
      subscription = event.data.object;
      status = subscription.status;
      console.log(`Subscription updated. Subscription status is ${status}.`);
      // Then define and call a method to handle the subscription update.
      // handleSubscriptionUpdated(subscription);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
}
