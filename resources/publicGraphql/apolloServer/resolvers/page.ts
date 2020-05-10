import { IEnumResolver } from 'graphql-tools';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { IPage, parseAttributeMap } from 'resources/shared/models/Page';
import { TResolverFn } from 'resources/publicGraphql/apolloServer/resolvers/TResolverFn';
import { TArgsId } from 'resources/publicGraphql/apolloServer/resolvers/TArgsId';

/* 
  we have to disable this eslint rule because we need this behavior (page -> pageToPages -> page)
  @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md#when-not-to-use-it
*/
/* eslint import/no-cycle: [0] */
/**
 * resolver function for the page query.
 * returns one page, by the page.id provided
 */
const page: TResolverFn<IPage | undefined, TArgsId> = (
  parent: IEnumResolver,
  args: TArgsId,
  ctx: TContext,
): Promise<IPage | undefined> =>
  ctx.dynamoDB
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
      async (data: GetItemOutput): Promise<IPage | undefined> =>
        (data?.Item && (await parseAttributeMap(data.Item, parent, ctx))) ??
        undefined,
    );

export { page };
