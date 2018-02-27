import path from "path";
import { readFileSync } from "fs";
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import next from "next";

import * as resolvers from "./resolvers";

const dev = process.env.NODE_ENV !== "production";

const app = express();
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const schemaPath = path.join(__dirname, "..", "graphql", "schema.graphql");
const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.get("/posts/:id", (req, res) => {
  const { params, query } = req;
  nextApp.render(req, res, "/posts", Object.assign({}, params, query));
});
app.get("*", (req, res) => nextHandler(req, res));

export const start = async (port: string | number) => {
  await nextApp.prepare();
  return app.listen(port);
};

if (require.main === module) {
  start(process.env.PORT || 3000);
}
