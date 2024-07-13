defmodule BooksWeb.Router do
  use BooksWeb, :router

  forward "/graphql", Absinthe.Plug, schema: BooksWeb.Graphql.Schema

  forward "/graphiql", Absinthe.Plug.GraphiQL, schema: BooksWeb.Graphql.Schema
end
