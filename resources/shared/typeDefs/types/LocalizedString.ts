import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const LocalizedString: DocumentNode = gql`
  type LocalizedString {
    unicode: String
    value: String
  }
`;

export { LocalizedString };
