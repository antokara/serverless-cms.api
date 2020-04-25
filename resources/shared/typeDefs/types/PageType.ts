import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const PageType: DocumentNode = gql`
  type PageType {
    id: ID
    title: String
    description: String
    pStatus: EStatus
    fieldTypes: [FieldType]
    minimum: Int
    maximum: Int
    childrenPages: [PageType]
    meta: Boolean
  }
`;

export { PageType };
