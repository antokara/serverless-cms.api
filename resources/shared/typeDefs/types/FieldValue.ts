import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const FieldValue: DocumentNode = gql`
  type FieldValue {
    id: ID
    key: String
    value: String
  }
`;

export { FieldValue };
