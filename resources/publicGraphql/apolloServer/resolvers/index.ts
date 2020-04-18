import { IResolvers } from 'graphql-tools';
import { languages } from 'resources/publicGraphql/apolloServer/resolvers/languages';

/**
 * our Apollo Resolvers
 */
const resolvers: IResolvers = {
  Query: {
    languages,
  },
};

export { resolvers };
