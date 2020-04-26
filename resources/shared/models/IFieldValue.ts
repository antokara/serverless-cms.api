import { AttributeValue, ListAttributeValue } from 'aws-sdk/clients/dynamodb';

// TODO: we need interface that is different per "key" since the value could
//       be localized, integer, etc.
interface IFieldValue {
  id: string;
  key: string;
  value: string;
}

/**
 * parses the AttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeValue: (fieldValue: AttributeValue) => IFieldValue = (
  fieldValue: AttributeValue,
): IFieldValue => ({
  id: fieldValue?.M?.id.S ?? '',
  key: fieldValue?.M?.key.S ?? '',
  value: fieldValue?.M?.value.S ?? '',
});

/**
 * parses the ListAttributeValue provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseListAttributeValue: (
  fieldValues: ListAttributeValue,
) => IFieldValue[] = (fieldValues: ListAttributeValue): IFieldValue[] =>
  fieldValues.map<IFieldValue>(parseAttributeValue);

export { IFieldValue, parseAttributeValue, parseListAttributeValue };
