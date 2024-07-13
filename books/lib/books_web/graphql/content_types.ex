defmodule BooksWeb.Graphql.ContentTypes do
  use Absinthe.Schema.Notation

  object :book do
    field(:id, non_null(:id))
    field(:title, non_null(:string))
    field(:author_id, non_null(:id))
    field(:published, :integer)
    field(:publisher_id, :id)
  end
end
