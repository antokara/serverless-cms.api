import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const queries: DocumentNode = gql`
  type Query {
    languages: [Language]
    menus: [Menu]
    page(
      id: ID = undefined
      unicode: String = undefined
      path: String = undefined
    ): Page
  }
`;

export { queries };
