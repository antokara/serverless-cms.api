import { IResolvers } from 'graphql-tools';
import { languages } from 'resources/publicGraphql/apolloServer/resolvers/languages';
import { menus } from 'resources/publicGraphql/apolloServer/resolvers/menus';
import { page } from 'resources/publicGraphql/apolloServer/resolvers/page';

/**
 * our Apollo Resolvers
 */
const resolvers: IResolvers = {
  Query: {
    languages,
    menus,
    page,
  },
};

export { resolvers };
