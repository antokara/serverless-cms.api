import { DocumentNode } from 'graphql';
import { languages } from 'resources/publicGraphql/apolloServer/typeDefs/queries/languages';
import { Language } from 'resources/shared/typeDefs/types/Language';

const typeDefs: DocumentNode[] = [languages, Language];

export { typeDefs };
