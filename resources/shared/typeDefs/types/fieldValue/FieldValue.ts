import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

/**
 * Interface for the Field Value.
 * All field values must implement this.
 * (must not be used directly)
 */
const FieldValue: DocumentNode = gql`
  interface FieldValue {
    id: ID
    key: String
  }
`;

export { FieldValue };
