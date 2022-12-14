import { getSession } from "next-auth/react";
import { rule, shield } from "graphql-shield";

const isAuthenticated = rule({ cache: "contextual" })(
  async (_parent, _args, { req }, _info) => {
    const session = await getSession({ req });
    return Boolean(session);
  }
);

export const permissions = shield({
  Query: {
    "*": isAuthenticated,
  },
  Mutation: {
    "*": isAuthenticated,
  },
});
