import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const FieldType: DocumentNode = gql`
  type FieldType {
    id: ID
    title: String
    description: String
    pStatus: EStatus
    lines: Int
    localized: Boolean
  }
`;

export { FieldType };
