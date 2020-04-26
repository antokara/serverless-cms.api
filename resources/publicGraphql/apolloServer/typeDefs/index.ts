import { DocumentNode } from 'graphql';
import { queries } from 'resources/publicGraphql/apolloServer/typeDefs/queries';
import { PageFieldType } from 'resources/shared/typeDefs/types/PageFieldType';
import { FieldValue } from 'resources/shared/typeDefs/types/FieldValue';
import { Language } from 'resources/shared/typeDefs/types/Language';
import { LocalizedString } from 'resources/shared/typeDefs/types/LocalizedString';
import { Menu } from 'resources/shared/typeDefs/types/Menu';
import { Page } from 'resources/shared/typeDefs/types/Page';
import { PageMeta } from 'resources/shared/typeDefs/types/PageMeta';
import { PageType } from 'resources/shared/typeDefs/types/PageType';
import { Status } from 'resources/shared/typeDefs/enums/Status';

const typeDefs: DocumentNode[] = [
  queries,
  PageFieldType,
  FieldValue,
  Language,
  LocalizedString,
  Menu,
  Page,
  PageMeta,
  PageType,
  Status,
];

export { typeDefs };
