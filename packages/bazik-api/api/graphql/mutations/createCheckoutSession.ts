import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const CreateCheckoutSessionMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createCheckoutSession", {
      type: "String",
      args: {
        priceId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { priceId },
        { prisma, currentUser, stripe }: Context,
        x
      ) => {
        let currentUserStripeId = currentUser.stripeCustomerId;

        if (!currentUserStripeId) {
          const customer = await stripe.customers.create({
            email: currentUser.email,
            metadata: {
              userId: currentUser.id,
            },
          });
          currentUserStripeId = customer.id;

          await prisma.user.update({
            where: {
              id: currentUser.id,
            },
            data: {
              stripeCustomerId: currentUserStripeId,
            },
          });
        }

        const session = await stripe.checkout.sessions.create({
          customer: currentUserStripeId,
          billing_address_collection: "auto",
          line_items: [
            {
              price: priceId,
              quantity: 1,
              // currency: "usd",
            },
          ],
          mode: "subscription",
          success_url: `${process.env.WEBAPP_DOMAIN}/projects?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.WEBAPP_DOMAIN}/settings?canceled=true`,
        });

        // console.info("session", session);

        return session.url;
      },
    });
  },
});
