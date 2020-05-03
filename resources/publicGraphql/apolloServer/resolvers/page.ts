import { IEnumResolver } from 'graphql-tools';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { IPage, parseAttributeMap } from 'resources/shared/models/Page';
import {
  IUrlToPage,
  parseAttributeMap as parseUrlToPageAttributeMap,
} from 'resources/shared/models/UrlToPage';
import { TArgsUnicodePath } from 'resources/publicGraphql/apolloServer/resolvers/page/TArgsUnicodePath';
import { TResolverFn } from 'resources/publicGraphql/apolloServer/resolvers/TResolverFn';
import { TArgsId } from 'resources/publicGraphql/apolloServer/resolvers/TArgsId';
import { isArgsId } from 'resources/publicGraphql/apolloServer/resolvers/page/isArgsId';
/**
 * resolver function for the page query.
 * returns one page, by the page.id provided
 */
const page: TResolverFn<IPage | undefined, TArgsId | TArgsUnicodePath> = (
  parent: IEnumResolver,
  args: TArgsId | TArgsUnicodePath,
  ctx: TContext,
): Promise<IPage | undefined> => {
  if (isArgsId(args)) {
    // search by id
    return ctx.dynamoDB
      .getItem({
        Key: {
          id: {
            S: args.id,
          },
        },
        TableName: 'pages',
      })
      .promise()
      .then(
        (data: GetItemOutput): IPage | undefined =>
          (data?.Item && parseAttributeMap(data.Item)) ?? undefined,
      );
  }
  // search by unicode + path
  return ctx.dynamoDB
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
};

export { page };
