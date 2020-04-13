import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

// Construct a schema, using GraphQL schema language
const typeDefs: DocumentNode = gql`
  type Query {
    hello: String
  }
`;

export { typeDefs };
