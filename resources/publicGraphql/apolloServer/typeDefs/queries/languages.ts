import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

const languages: DocumentNode = gql`
  type Query {
    languages: [Language]
  }
`;

export { languages };
