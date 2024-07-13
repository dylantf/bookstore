import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import gql from "graphql-tag";

type Author = {
  id: string;
  name: string;
};

const authors: Author[] = [
  { id: "1", name: "Billy" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Cleetus" },
  { id: "4", name: "John" },
  { id: "5", name: "Wyatt" },
];

const resolvers = {
  // Book: {
  //   author: (parent: Book) => {
  //     return authors.find(author => author.id === parent.authorId);
  //   },
  // },
  Query: {
    authors: () => authors,
  },
};

const typeDefs = gql(
  readFileSync("./src/schema.graphql", {
    encoding: "utf-8",
  })
);

const apolloServer = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
await apolloServer.start();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello wroldddd");
});

app.use("/graphql", expressMiddleware(apolloServer));

app.listen(4001, () => {
  console.log("Running Authors subgraph on http://localhost:4001");
});
