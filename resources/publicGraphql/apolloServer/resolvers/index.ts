import { IResolvers } from 'graphql-tools';
import { languages } from 'resources/publicGraphql/apolloServer/resolvers/languages';
import { menus } from 'resources/publicGraphql/apolloServer/resolvers/menus';
import { page } from 'resources/publicGraphql/apolloServer/resolvers/page';
import { resolveType as fieldValueLUStringResolveType } from 'resources/shared/typeDefs/types/fieldValue/string/LUString';
/**
 * our Apollo Resolvers
 */
const resolvers: IResolvers = {
  FieldValue: {
    __resolveType: fieldValueLUStringResolveType,
  },
  FieldValueLUString: {
    __resolveType: fieldValueLUStringResolveType,
  },
  Query: {
    languages,
    menus,
    page,
  },
};

export { resolvers };
