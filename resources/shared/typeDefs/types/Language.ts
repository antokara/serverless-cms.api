import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const Language: DocumentNode = gql`
  type Language {
    unicode: ID
    sort: Int
    fallback: Boolean
    pStatus: EStatus
    title: String
  }
`;

export { Language };
