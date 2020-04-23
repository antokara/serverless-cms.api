import { DocumentNode } from 'graphql';
import { queries } from 'resources/publicGraphql/apolloServer/typeDefs/queries';
import { Language } from 'resources/shared/typeDefs/types/Language';
import { Menu } from 'resources/shared/typeDefs/types/Menu';
import { Status } from 'resources/shared/typeDefs/enums/Status';

const typeDefs: DocumentNode[] = [Status, Language, Menu, queries];

export { typeDefs };
