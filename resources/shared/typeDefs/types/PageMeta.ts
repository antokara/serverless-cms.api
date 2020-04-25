import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const PageMeta: DocumentNode = gql`
  type PageMeta {
    title: [LocalizedString]
    description: [LocalizedString]
    keywords: [LocalizedString]
  }
`;

export { PageMeta };
