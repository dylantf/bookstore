defmodule BooksWeb.Graphql.ContentTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Federation.Notation

  object :author do
    key_fields("id")
    extends()

    field :id, non_null(:id)

    field :books, list_of(:book) do
      resolve(fn parent, _, _ ->
        books = Enum.filter(Books.Book.mock_db(), fn book -> book.author_id == parent.id end)
        {:ok, books}
      end)
    end
  end

  object :book do
    key_fields("id")
    shareable()

    field :id, non_null(:id)
    field :title, non_null(:string)

    field :author_id, non_null(:id) do
      shareable()
    end

    field :published, :integer
    field :publisher_id, :id
  end
end
