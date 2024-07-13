defmodule Books.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      BooksWeb.Telemetry,
      Books.Repo,
      {DNSCluster, query: Application.get_env(:books, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Books.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Books.Finch},
      # Start a worker by calling: Books.Worker.start_link(arg)
      # {Books.Worker, arg},
      # Start to serve requests, typically the last entry
      BooksWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Books.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    BooksWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
