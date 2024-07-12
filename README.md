An attempt at setting up a federated GraphQL server, containing a local gateway router and two subgraphs

Directories are:

- `router/`: Contains the router gateway and supergraph
- `authors/`: Contains subgraph A (authors, books)
- `publishers/`: Contains subgraph B (extension of author, publisher)

### Installation:

- Bun
- Apollo Rover CLI tool https://www.apollographql.com/docs/rover
- `bun install` in each directory

### Composing the supergraph:

From within the `router/` directory, run `bun run supergraph:compose`. The supergraph will output to router/src/supergraph.graphql

### Running (development)

- Gateway:
  - From within `router/`, run `bun start`
- Authors subgraph:
  - From within `authors/`, run `bun start`
- Publishers subgraph:
  - From within `publishers/`, run `bun start`
