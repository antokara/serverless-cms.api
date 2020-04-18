import { IEnumResolver } from 'graphql-tools';
import { TContext } from 'resources/publicGraphql/apolloServer/context';

/**
 * An Apollo Resolver Function type
 * @see https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
 */
type TResolverFn<T> = (
  parent: IEnumResolver,
  args: undefined,
  ctx: TContext,
) => Promise<T>;

export { TResolverFn };
