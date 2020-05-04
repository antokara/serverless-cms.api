import { IEnumResolver } from 'graphql-tools';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { IPage } from 'resources/shared/models/Page';
import {
  IUrlToPage,
  parseAttributeMap as parseUrlToPageAttributeMap,
} from 'resources/shared/models/UrlToPage';
import { TArgsUnicodePath } from 'resources/publicGraphql/apolloServer/resolvers/page/TArgsUnicodePath';
import { TResolverFn } from 'resources/publicGraphql/apolloServer/resolvers/TResolverFn';
import { page } from 'resources/publicGraphql/apolloServer/resolvers/page';

/**
 * resolver function for the urlToPage query.
 * returns one page, by the unicode + path provided
 */
const urlToPage: TResolverFn<IPage | undefined, TArgsUnicodePath> = (
  parent: IEnumResolver,
  args: TArgsUnicodePath,
  ctx: TContext,
): Promise<IPage | undefined> =>
  ctx.dynamoDB
    .getItem({
      Key: {
        unicode: {
          S: args.unicode,
        },
        path: {
          S: args.path,
        },
      },
      TableName: 'urlToPage',
    })
    .promise()
    .then(
      async (data: GetItemOutput): Promise<IPage | undefined> => {
        if (data.Item) {
          const urlToPage: IUrlToPage = parseUrlToPageAttributeMap(data.Item);
          if (urlToPage.pageId) {
            // direct internal page
            return page(parent, { id: urlToPage.pageId }, ctx);
          } else if (urlToPage.path) {
            // redirect to URL (internal or external)
          }
        }
        // no page was found
        return undefined;
      },
    );

export { urlToPage };
