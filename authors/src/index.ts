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

type Book = {
  id: string;
  authorId: string;
};

// Minimal representation of books, even though the type is not defined here.
// In real life we'd make a dataloader to load these references from the db if needed.
const books: Book[] = [
  { id: "1", authorId: "1" },
  { id: "2", authorId: "2" },
  { id: "3", authorId: "3" },
  { id: "4", authorId: "4" },
  { id: "5", authorId: "3" },
  { id: "6", authorId: "5" },
  { id: "7", authorId: "5" },
  { id: "8", authorId: "5" },
  { id: "9", authorId: "5" },
];

type AuthorEntity = {
  __typename: "Author";
  id: string;
};

type BookEntity = {
  __typename: "Book";
  id: string;
  authorId: string;
};

const resolvers = {
  Query: {
    authors: () => authors,
  },
  Author: {
    __resolveReference(authorRef: AuthorEntity) {
      return authors.find(author => author.id === authorRef.id);
    },
  },
  Book: {
    __resolveReference(bookRef: BookEntity) {
      return books.find(book => book.id === bookRef.id);
    },
    author(parent: Book) {
      return authors.find(author => author.id === parent.authorId);
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

app.listen(4001, () => {
  console.log("Running Authors subgraph on http://localhost:4001");
});
