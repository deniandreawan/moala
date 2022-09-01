import { makeSchema, asNexusMethod } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { applyMiddleware } from "graphql-middleware";
import { join } from "path";
import { permissions } from "./permissions";
import * as types from "./types";

const GQLDate = asNexusMethod(DateTimeResolver, "date");

const baseSchema = makeSchema({
  types: [types, GQLDate],
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
});

export const schema = applyMiddleware(baseSchema, permissions);
