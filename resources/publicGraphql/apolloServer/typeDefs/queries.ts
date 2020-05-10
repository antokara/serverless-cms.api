import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const queries: DocumentNode = gql`
  type Query {
    languages: [Language]
    page(id: ID): Page
    urlToPage(unicode: String, path: String): UrlToPage
  }
`;

export { queries };
