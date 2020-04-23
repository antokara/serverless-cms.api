import { IResolvers } from 'graphql-tools';
import { languages } from 'resources/publicGraphql/apolloServer/resolvers/languages';
import { menus } from 'resources/publicGraphql/apolloServer/resolvers/menus';

/**
 * our Apollo Resolvers
 */
const resolvers: IResolvers = {
  Query: {
    languages,
    menus,
  },
};

export { resolvers };
