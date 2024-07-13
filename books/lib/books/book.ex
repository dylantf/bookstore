defmodule Books.Book do
  def mock_db() do
    [
      %{id: "1", title: "How to milk a goat", published: 1997, author_id: "1"},
      %{id: "2", title: "How to milk a cow", published: 1998, author_id: "2"},
      %{id: "3", title: "Pigs, what are they?", published: 2001, author_id: "3"},
      %{id: "4", title: "Farm Life", published: 1999, author_id: "4"},
      %{id: "5", title: "My Brother Bob", published: 1998, author_id: "3"},
      %{id: "6", title: "Maximum Egg Yield", published: 1980, author_id: "5"},
      %{id: "7", title: "Chickens are Loud", published: 1764, author_id: "5"},
      %{id: "8", title: "I Hate Chickens", published: 2005, author_id: "5"},
      %{id: "9", title: "Chickens Ruined My Life", published: 2024, author_id: "5"}
    ]
  end
end
