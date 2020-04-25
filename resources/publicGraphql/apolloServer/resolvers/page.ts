import { IEnumResolver } from 'graphql-tools';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { IPage, parseAttributeMap } from 'resources/shared/models/Page';
import { TResolverFn } from './TResolverFn';

/**
 * resolver function for the page query.
 * returns one page, by the page.id provided
 */
const page: TResolverFn<IPage | undefined> = (
  parent: IEnumResolver,
  args: undefined,
  ctx: TContext,
): Promise<IPage | undefined> =>
  ctx.dynamoDB
    .getItem({
      Key: {
        id: {
          S: 'home',
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
