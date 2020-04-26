import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const PageFieldType: DocumentNode = gql`
  type PageFieldType {
    id: ID
    title: String
    description: String
    pStatus: EStatus
    lines: Int
    localized: Boolean
  }
`;

export { PageFieldType };
