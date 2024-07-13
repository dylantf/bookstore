defmodule BooksWeb.Graphql.Schema do
  use Absinthe.Schema
  use Absinthe.Federation.Schema

  import_types(BooksWeb.Graphql.ContentTypes)

  extend schema do
    directive(:link,
      url: "https://specs.apollo.dev/federation/v2.3",
      import: [
        "@key",
        "@shareable",
        "@provides",
        "@requires",
        "@external",
        "@tag",
        "@extends",
        "@override",
        "@inaccessible",
        "@composeDirective",
        "@interfaceObject"
      ]
    )
  end

  query do
    extends()

    field :books, list_of(:book) do
      resolve(fn _, _, _ -> {:ok, Books.Book.mock_db()} end)
    end
  end
end
