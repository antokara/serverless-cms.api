import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { IPage } from 'resources/shared/models/Page';
import { IEnumResolver } from 'graphql-tools';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { page as pageResolver } from 'resources/publicGraphql/apolloServer/resolvers/page';
import {
  IRedirection,
  parseAttributeMap as parseRedirectAttributeMap,
} from './Redirection';

/**
 * interface used by the Apollo Resolver, etc.
 */
interface IUrlToPage {
  unicode: string;
  path: string;
  // when provided, this url (unicode + path), points to an internal page
  page?: IPage;
  // when provided, this url (unicode + path), points to either
  // an external page or to an internal page that moved
  // with httpCode redirection (ie. 301)
  redirection?: IRedirection;
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
  redirection: urlToPage.redirect?.M
    ? parseRedirectAttributeMap(urlToPage.redirect.M)
    : undefined,
});

export { IUrlToPage, parseAttributeMap };
