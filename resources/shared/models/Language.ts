import { AttributeMap } from 'aws-sdk/clients/dynamodb';

/**
 * interface used by the Apollo Resolver, etc.
 */
interface ILanguage {
  unicode: string;
  sort: number;
  fallback: boolean;
  pStatus: string;
  title: string;
}

/**
 * parses the attributeMap provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 *
 * @param language
 */
const parseAttributeMap: (language: AttributeMap) => ILanguage = (
  language: AttributeMap,
): ILanguage => ({
  unicode: language.unicode.S ?? '',
  title: language.title.S ?? '',
  sort: Number(language.sort.N) ?? 0,
  fallback: Boolean(language.fallback.B) ?? false,
  pStatus: language.pStatus.S ?? '',
});

export { ILanguage, parseAttributeMap };
