import { IEnumResolver } from 'graphql-tools';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import {
  IUrlToPage,
  parseAttributeMap,
} from 'resources/shared/models/UrlToPage';
import { TArgsUnicodePath } from 'resources/publicGraphql/apolloServer/resolvers/page/TArgsUnicodePath';
import { TResolverFn } from 'resources/publicGraphql/apolloServer/resolvers/TResolverFn';

/**
 * resolver function for the urlToPage query.
 * returns one UrlToPage, by the unicode + path provided
 */
const urlToPage: TResolverFn<IUrlToPage | undefined, TArgsUnicodePath> = (
  parent: IEnumResolver,
  args: TArgsUnicodePath,
  ctx: TContext,
): Promise<IUrlToPage | undefined> =>
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
      (data: GetItemOutput): Promise<IUrlToPage> | undefined =>
        (data?.Item && parseAttributeMap(data.Item, parent, ctx)) ?? undefined,
    );

export { urlToPage };
