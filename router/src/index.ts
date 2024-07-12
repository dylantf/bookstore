import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";

const supergraphSdl = readFileSync("./src/supergraph.graphql", {
  encoding: "utf-8",
});

const gateway = new ApolloGateway({
  supergraphSdl,
});

const apolloServer = new ApolloServer({ gateway });
await apolloServer.start();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/graphiql", (req, res) => {
  res.sendFile("./src/graphiql.html", {
    root: ".",
  });
});

app.use("/graphql", expressMiddleware(apolloServer));

app.listen(4000, () => {
  console.log("Running Authors subgraph on http://localhost:4000");
});
