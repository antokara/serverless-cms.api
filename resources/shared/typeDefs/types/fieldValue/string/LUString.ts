import { gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';
import { TLUString } from 'resources/shared/models/fieldValue/string/TLUString';
import { IUString } from 'resources/shared/models/fieldValue/string/IUString';
import { type as FieldValueLString } from './LString';
import { type as FieldValueUString } from './UString';

/**
 * Localized or Unlocalized String Field Value
 */
const LUString: DocumentNode = gql`
  union FieldValueLUString = FieldValueUString | FieldValueLString
`;

/**
 * to be used by the "__resolveType" function
 * in the Apollo resolver function for FieldValueLUString
 */
const resolveType: (fieldValue: TLUString) => string = (
  fieldValue: TLUString,
): string => {
  if (typeof (fieldValue as IUString).uStringValue !== 'undefined') {
    return FieldValueUString;
  }
  return FieldValueLString;
};

export { LUString, resolveType };
