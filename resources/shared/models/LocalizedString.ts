import { AttributeValue, ListAttributeValue } from 'aws-sdk/clients/dynamodb';

interface ILocalizedString {
  unicode: string;
  value: string;
}

/**
 * parses the AttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeValue: (
  localizedString: AttributeValue,
) => ILocalizedString = (
  localizedString: AttributeValue,
): ILocalizedString => ({
  unicode: localizedString?.M?.unicode.S ?? '',
  value: localizedString?.M?.value.S ?? '',
});

/**
 * parses the ListAttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseListAttributeValue: (
  localizedStrings: ListAttributeValue,
) => ILocalizedString[] = (
  localizedStrings: ListAttributeValue,
): ILocalizedString[] =>
  localizedStrings.map<ILocalizedString>(parseAttributeValue);

export { ILocalizedString, parseAttributeValue, parseListAttributeValue };
