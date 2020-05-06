import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const UrlToPage: DocumentNode = gql`
  type UrlToPage {
    page: Page
    redirection: Redirection
  }
`;

export { UrlToPage };
