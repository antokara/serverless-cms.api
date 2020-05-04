import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { IPage } from 'resources/shared/models/Page';
import { EHttpCode } from 'resources/shared/models/EHttpCode';
import { IEnumResolver } from 'graphql-tools';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { page as pageResolver } from 'resources/publicGraphql/apolloServer/resolvers/page';

/**
 * interface used by the Apollo Resolver, etc.
 */
interface IUrlToPage {
  unicode: string;
  path: string;
  // when provided, this url, points to an internal page
  page?: IPage;
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
const parseAttributeMap: (
  urlToPage: AttributeMap,
  parent: IEnumResolver,
  ctx: TContext,
) => Promise<IUrlToPage> = async (
  urlToPage: AttributeMap,
  parent: IEnumResolver,
  ctx: TContext,
): Promise<IUrlToPage> => ({
  unicode: urlToPage.unicode.S ?? '',
  path: urlToPage.path.S ?? '',
  page: urlToPage.pageId?.S
    ? await pageResolver(parent, { id: urlToPage.pageId?.S }, ctx)
    : undefined,
  url: urlToPage.url?.S,
  httpCode: urlToPage.httpCode?.N ? Number(urlToPage.httpCode.N) : undefined,
});

export { IUrlToPage, parseAttributeMap };
