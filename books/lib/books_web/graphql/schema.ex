defmodule BooksWeb.Graphql.Schema do
  use Absinthe.Schema

  import_types(BooksWeb.Graphql.ContentTypes)

  query do
    field :books, list_of(:book) do
      resolve(fn _, _, _ ->
        books = [
          %{id: "1", title: "How to milk a goat", published: 1997, authorId: "1"},
          %{id: "2", title: "How to milk a cow", published: 1998, authorId: "2"},
          %{id: "3", title: "Pigs, what are they?", published: 2001, authorId: "3"},
          %{id: "4", title: "Farm Life", published: 1999, authorId: "4"},
          %{id: "5", title: "My Brother Bob", published: 1998, authorId: "3"},
          %{id: "6", title: "Maximum Egg Yield", published: 1980, authorId: "5"},
          %{id: "7", title: "Chickens are Loud", published: 1764, authorId: "5"},
          %{id: "8", title: "I Hate Chickens", published: 2005, authorId: "5"},
          %{id: "9", title: "Chickens Ruined My Life", published: 2024, authorId: "5"}
        ]

        {:ok, books}
      end)
    end
  end
end
