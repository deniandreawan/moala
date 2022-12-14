import { objectType, extendType, stringArg, nonNull } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.string("image");
  },
});

export const UserQueries = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.field("user", {
      type: "User",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findUnique({
          where: { id: args.userId },
        });
      },
    });
  },
});

export const UserMutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createUser", {
      type: "User",
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: async (_, { name, email }, ctx) => {
        return ctx.prisma.user.create({
          data: {
            name,
            email,
          },
        });
      },
    });
  },
});
