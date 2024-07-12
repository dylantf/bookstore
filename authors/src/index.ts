import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import gql from "graphql-tag";
import { readFileSync } from "fs";
import { buildSubgraphSchema } from "@apollo/subgraph";

type Author = {
  id: string;
  name: string;
};

type Book = {
  id: string;
  title: string;
  published: number;
  authorId: string;
};

const authors: Author[] = [
  { id: "1", name: "Billy" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Cleetus" },
  { id: "4", name: "John" },
  { id: "5", name: "Wyatt" },
];

const books: Book[] = [
  { id: "1", title: "How to milk a goat", published: 1997, authorId: "1" },
  { id: "2", title: "How to milk a cow", published: 1998, authorId: "2" },
  { id: "3", title: "Pigs, what are they?", published: 2001, authorId: "3" },
  { id: "4", title: "Farm Life", published: 1999, authorId: "4" },
  { id: "5", title: "My Brother Bob", published: 1998, authorId: "3" },
  { id: "6", title: "Maximum Egg Yield", published: 1980, authorId: "5" },
  { id: "7", title: "Chickens are Loud", published: 1764, authorId: "5" },
  { id: "8", title: "I Hate Chickens", published: 2005, authorId: "5" },
  { id: "9", title: "Chickens Ruined My Life", published: 2024, authorId: "5" },
];

const resolvers = {
  Book: {
    author: (parent: Book) => {
      return authors.find(author => author.id === parent.authorId);
    },
  },
  Query: {
    authors: () => authors,
    books: () => books,
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
