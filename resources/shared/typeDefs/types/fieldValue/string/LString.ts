import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

/**
 * Apollo GQL type for use by resolver.__resolveType function
 */
const type: string = 'FieldValueLString';

/**
 * Localized String Field Value
 */
const LString: DocumentNode = gql`
  type FieldValueLString implements FieldValue {
    id: ID
    key: String
    lStringValue: [LocalizedString]
  }
`;

export { LString, type };
