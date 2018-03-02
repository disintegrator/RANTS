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

// GraphQL requires a single route
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL is a handy ui for browsing a graphql server like this one
// Either install the GraphiQL app or go to
// http://localhost:3000/graphiql (by default) to use the web ui
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// If you want to have dynamic routes you need to explicitly add server routes
// like this route that renders a single post
app.get("/posts/:id", (req, res) => {
  const { params, query } = req;
  nextApp.render(req, res, "/posts", Object.assign({}, params, query));
});

// The next-offline plugin requires registering a route for serving the
// service worker script that will act as a cache
app.get("/service-worker.js", (req, res) => {
  const filePath = path.join(__dirname, "..", ".next", "service-worker.js");
  nextApp.serveStatic(req, res, filePath);
});

// All other routes are handled by next.js
app.get("*", (req, res) => nextHandler(req, res));

export const start = async (port: string | number) => {
  await nextApp.prepare();
  return app.listen(port);
};

if (require.main === module) {
  start(process.env.PORT || 3000);
}
