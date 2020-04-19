import { DocumentNode } from 'graphql';
import { languages } from 'resources/publicGraphql/apolloServer/typeDefs/queries/languages';
import { Language } from 'resources/shared/typeDefs/types/Language';
import { Status } from 'resources/shared/typeDefs/enums/Status';

const typeDefs: DocumentNode[] = [Status, languages, Language];

export { typeDefs };
