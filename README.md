An attempt at setting up a federated GraphQL server, containing a local gateway router and two subgraphs

Directories are:

- `router/`: Contains the router gateway and supergraph
- `authors/`: Contains subgraph A (Authors, extension of Book)
- `publishers/`: Contains subgraph B (Publisher, extension of Author)
- `books/`: Contains subgraph B (Book, extension of Author)

### Installation:

- Bun
- Elixir
- Apollo Rover CLI tool https://www.apollographql.com/docs/rover
- `bun install` in each directory

The node APIs just have hardcoded GraphQL SDL since this is the easiest path with Apollo Server.

In the Elixir API (books), use the custom mix task `mix sdl`. This uses the Absinthe Federation wrapper to generate the federation version of the SDL.

### Composing the supergraph:

From within the `router/` directory, run `bun run supergraph:compose`. The supergraph will output to router/src/supergraph.graphql

### Running (development)

- Gateway:
  - From within `router/`, run `bun start`
- Authors subgraph:
  - From within `authors/`, run `bun start`
- Publishers subgraph:
  - From within `publishers/`, run `bun start`
- Books subgraph:
  - From within `books`, run `mix phx.server`
