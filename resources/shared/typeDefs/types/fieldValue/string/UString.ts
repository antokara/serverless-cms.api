import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';

/**
 * Apollo GQL type for use by resolver.__resolveType function
 */
const type: string = 'FieldValueUString';

/**
 * Unlocalized String Field Value
 */
const UString: DocumentNode = gql`
  type FieldValueUString implements FieldValue {
    id: ID
    key: String
    uStringValue: String
  }
`;

export { UString, type };
