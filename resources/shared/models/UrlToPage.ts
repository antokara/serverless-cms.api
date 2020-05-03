import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { EHttpCode } from 'resources/shared/models/EHttpCode';

/**
 * interface used by the Apollo Resolver, etc.
 */
interface IUrlToPage {
  unicode: string;
  path: string;
  // when provided, this url, points to an internal page
  pageId?: string;
  // when provided, this url, points to either
  // an external page or to an internal page that moved
  // with httpCode redirection (ie. 301)
  url?: string;
  httpCode?: EHttpCode;
}

/**
 * parses the attributeMap provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeMap: (urlToPage: AttributeMap) => IUrlToPage = (
  urlToPage: AttributeMap,
): IUrlToPage => ({
  unicode: urlToPage.unicode.S ?? '',
  path: urlToPage.path.S ?? '',
  pageId: urlToPage.pageId?.S,
  url: urlToPage.url?.S,
  httpCode: EHttpCode[urlToPage.httpCode?.N as keyof typeof EHttpCode],
});

export { IUrlToPage, parseAttributeMap };
