import { extendType, nonNull, stringArg } from "nexus";

import { Context } from "../../context";

export const CurrentUserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("currentUser", {
      type: "User",
      args: {},
      resolve: async (
        _,
        {},
        { prisma, mixpanel, req, currentUser }: Context,
        x
      ) => {
        return currentUser;
      },
    });
  },
});
