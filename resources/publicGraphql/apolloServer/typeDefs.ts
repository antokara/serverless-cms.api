import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

// Construct a schema, using GraphQL schema language
// TODO: break down to smaller files
const typeDefs: DocumentNode = gql`
  type Language {
    unicode: ID
    sort: Int
    fallback: Boolean
    pStatus: String
    title: String
  }

  type Query {
    languages: [Language]
  }
`;

export { typeDefs };
