import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

/**
 * a redirection from unicode + path, to a url + httpCode
 *
 * @see resources/shared/typeDefs/types/UrlToPage.ts
 */
const Redirection: DocumentNode = gql`
  type Redirection {
    url: String
    httpCode: Int
  }
`;

export { Redirection };
