import { IEnumResolver } from 'graphql-tools';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { IMenu, parseAttributeMap } from 'resources/shared/models/Menu';
import { TResolverFn } from './TResolverFn';

/**
 * resolver function for the menus query.
 * returns the list of all menus, unsorted
 */
const menus: TResolverFn<IMenu[]> = (
  parent: IEnumResolver,
  args: undefined,
  ctx: TContext,
): Promise<IMenu[]> =>
  ctx.dynamoDB
    .scan({
      TableName: 'menus',
    })
    .promise()
    .then(
      (data: ScanOutput): IMenu[] => data?.Items?.map(parseAttributeMap) ?? [],
    );

export { menus };
