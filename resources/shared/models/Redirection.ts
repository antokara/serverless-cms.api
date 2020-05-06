import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { EHttpCode } from 'resources/shared/models/EHttpCode';

/**
 * interface used by the Apollo Resolver, etc.
 *
 * @see resources/shared/models/UrlToPage.ts
 */
interface IRedirection {
  url: string;
  httpCode: EHttpCode;
}

/**
 * parses the attributeMap provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeMap: (redirect: AttributeMap) => IRedirection = (
  redirect: AttributeMap,
): IRedirection => ({
  url: redirect.url.S ?? '',
  httpCode: Number(redirect.httpCode.N),
});

export { IRedirection, parseAttributeMap };
