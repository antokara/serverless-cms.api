import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const Page: DocumentNode = gql`
  type Page {
    id: ID
    title: String
    description: String
    pStatus: EStatus
    pageTypeId: String
    fieldValues: [FieldValueLUString]
    url: [LocalizedString]
    meta: PageMeta
  }
`;

export { Page };
