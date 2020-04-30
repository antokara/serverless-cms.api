import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const Menu: DocumentNode = gql`
  type Menu {
    id: ID
    title: String
    description: String
    pStatus: EStatus
    expandLevels: Int
    minPages: Int
    maxPages: Int
    pages: [Page]
  }
`;

export { Menu };
