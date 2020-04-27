import { AttributeValue, ListAttributeValue } from 'aws-sdk/clients/dynamodb';
import { TFieldValue } from 'resources/shared/models/fieldValue/TFieldValue';
import { parseListAttributeValue as parseLocalizedStrings } from 'resources/shared/models/LocalizedString';
import { IFieldValue } from './IFieldValue';

/**
 * parses the AttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 *
 * depending on the type of Field Value,
 * the parsing is different and so is the return type
 *
 * in case of no match, undefined is returned so that we can filter it out
 */
const parseAttributeValue: (
  fieldValue: AttributeValue,
) => TFieldValue | undefined = (
  fieldValue: AttributeValue,
): TFieldValue | undefined => {
  // base attributes
  const parsedValue: IFieldValue = {
    id: fieldValue?.M?.id.S ?? '',
    key: fieldValue?.M?.key.S ?? '',
  };

  // localized string
  if (fieldValue?.M?.lStringValue?.L) {
    return {
      ...parsedValue,
      lStringValue: parseLocalizedStrings(fieldValue?.M?.lStringValue?.L) ?? [],
    };
  }

  // unlocalized string
  if (fieldValue?.M?.uStringValue?.S) {
    return {
      ...parsedValue,
      uStringValue: fieldValue?.M?.uStringValue?.S ?? '',
    };
  }

  // no match
  return undefined;
};

/**
 * parses the ListAttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseListAttributeValue: (
  fieldValues: ListAttributeValue,
) => TFieldValue[] = (fieldValues: ListAttributeValue): TFieldValue[] =>
  fieldValues
    .map<TFieldValue | undefined>(parseAttributeValue)
    .filter<TFieldValue>(
      (fieldValue: TFieldValue | undefined): fieldValue is TFieldValue =>
        fieldValue !== undefined,
    );

export { IFieldValue, parseAttributeValue, parseListAttributeValue };
