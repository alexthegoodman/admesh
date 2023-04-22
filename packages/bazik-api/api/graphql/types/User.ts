import { objectType } from "nexus";
import { Context } from "../../context";

export const UserType = objectType({
  name: "User",
  definition(t) {
    // PRIVATE: id, password
    t.field("email", { type: "String" });
    t.field("role", { type: "String" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
