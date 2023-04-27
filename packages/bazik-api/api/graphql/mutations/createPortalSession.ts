import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const CreatePortalSessionMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPortalSession", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, currentUser, stripe }: Context, x) => {
        const returnUrl = process.env.WEBAPP_DOMAIN + "/settings";

        const portalSession = await stripe.billingPortal.sessions.create({
          customer: currentUser.stripeCustomerId as string,
          return_url: returnUrl,
        });

        return portalSession.url;
      },
    });
  },
});
