import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

/**
 * for use in pStatus fields.
 * @see resources/shared/models/EStatus.ts
 */
const Status: DocumentNode = gql`
  enum EStatus {
    DELETED
    DRAFT
    PUBLISHED
  }
`;

export { Status };
