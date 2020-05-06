import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const UrlToPage: DocumentNode = gql`
  type UrlToPage {
    page: Page
    redirect: Redirect
  }
`;

export { UrlToPage };
