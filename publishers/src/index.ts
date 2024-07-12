import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import gql from "graphql-tag";

type Author = {
  id: string;
  publisherId: string | null;
};

type AuthorEntity = {
  __typename: "Author";
  id: string;
};

type Publisher = {
  id: string;
  name: string;
};

const authors: Author[] = [
  { id: "1", publisherId: "1" },
  { id: "2", publisherId: null },
  { id: "3", publisherId: null },
  { id: "4", publisherId: "2" },
  { id: "5", publisherId: "2" },
];

const publishers: Publisher[] = [
  { id: "1", name: "Farmer's Friend Publishing Pty" },
  { id: "2", name: "Annoying Animals House LLC" },
];

const resolvers = {
  Query: {
    publishers: () => publishers,
  },
  Author: {
    __resolveReference(authorRepresentation: AuthorEntity) {
      return authors.find(author => author.id === authorRepresentation.id);
    },
    publisher(parent: Author) {
      if (!parent.publisherId) return null;
      return publishers.find(p => p.id === parent.publisherId);
    },
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

app.listen(4002, () => {
  console.log("Running Authors subgraph on http://localhost:4002");
});
