import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

/**
 * a redirection from unicode + path, to a url + httpCode
 *
 * @see resources/shared/typeDefs/types/UrlToPage.ts
 */
const Redirect: DocumentNode = gql`
  type Redirect {
    url: String
    httpCode: Int
  }
`;

export { Redirect };
