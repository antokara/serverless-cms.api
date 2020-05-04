import { IEnumResolver } from 'graphql-tools';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { IPage, parseAttributeMap } from 'resources/shared/models/Page';
import { TResolverFn } from 'resources/publicGraphql/apolloServer/resolvers/TResolverFn';
import { TArgsId } from 'resources/publicGraphql/apolloServer/resolvers/TArgsId';

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
      (data: GetItemOutput): IPage | undefined =>
        (data?.Item && parseAttributeMap(data.Item)) ?? undefined,
    );

export { page };
