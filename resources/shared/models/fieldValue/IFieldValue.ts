import { AttributeValue, ListAttributeValue } from 'aws-sdk/clients/dynamodb';
import { resolveType as fieldValueLUStringResolveType } from 'resources/shared/typeDefs/types/fieldValue/string/LUString';
import { type as FieldValueLString } from 'resources/shared/typeDefs/types/fieldValue/string/LString';
import { type as FieldValueUString } from 'resources/shared/typeDefs/types/fieldValue/string/UString';
import { TLUString } from 'resources/shared/models/fieldValue/string/TLUString';
import {
  ILocalizedString,
  parseListAttributeValue as parseLocalizedStrings,
} from 'resources/shared/models/LocalizedString';

// TODO: we need interface that is different per "key" since the value could
//       be localized, integer, etc.
interface IFieldValue {
  id: string;
  key: string;
}

/**
 * parses the AttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeValue: (fieldValue: AttributeValue) => TLUString = (
  fieldValue: AttributeValue,
): TLUString => {
  const parsedValue: IFieldValue = {
    id: fieldValue?.M?.id.S ?? '',
    key: fieldValue?.M?.key.S ?? '',
  };
  // TODO: use proper interface, not string specific and handle any type
  if (fieldValue?.M?.lStringValue?.L) {
    return {
      ...parsedValue,
      lStringValue: parseLocalizedStrings(fieldValue?.M?.lStringValue?.L) ?? [],
    };
  }
  // if (fieldValue?.M?.uStringValue?.S) {
  return {
    ...parsedValue,
    uStringValue: fieldValue?.M?.uStringValue?.S ?? '',
  };
  // }
};

/**
 * parses the ListAttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseListAttributeValue: (
  fieldValues: ListAttributeValue,
) => TLUString[] = (fieldValues: ListAttributeValue): TLUString[] =>
  fieldValues.map<TLUString>(parseAttributeValue);

export { IFieldValue, parseAttributeValue, parseListAttributeValue };
