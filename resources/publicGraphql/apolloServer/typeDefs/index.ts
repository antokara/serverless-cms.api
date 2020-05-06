import { DocumentNode } from 'graphql';
import { queries } from 'resources/publicGraphql/apolloServer/typeDefs/queries';
import { PageFieldType } from 'resources/shared/typeDefs/types/PageFieldType';
import { LString as FieldValueLString } from 'resources/shared/typeDefs/types/fieldValue/string/LString';
import { UString as FieldValueUString } from 'resources/shared/typeDefs/types/fieldValue/string/UString';
import { LUString as FieldValueLUString } from 'resources/shared/typeDefs/types/fieldValue/string/LUString';
import { FieldValue } from 'resources/shared/typeDefs/types/fieldValue/FieldValue';
import { Language } from 'resources/shared/typeDefs/types/Language';
import { LocalizedString } from 'resources/shared/typeDefs/types/LocalizedString';
import { Menu } from 'resources/shared/typeDefs/types/Menu';
import { Page } from 'resources/shared/typeDefs/types/Page';
import { PageMeta } from 'resources/shared/typeDefs/types/PageMeta';
import { PageType } from 'resources/shared/typeDefs/types/PageType';
import { Redirection } from 'resources/shared/typeDefs/types/Redirection';
import { UrlToPage } from 'resources/shared/typeDefs/types/UrlToPage';
import { Status } from 'resources/shared/typeDefs/enums/Status';

const typeDefs: DocumentNode[] = [
  queries,
  PageFieldType,
  FieldValue,
  FieldValueLString,
  FieldValueUString,
  FieldValueLUString,
  Language,
  LocalizedString,
  Menu,
  Page,
  PageMeta,
  PageType,
  Redirection,
  UrlToPage,
  Status,
];

export { typeDefs };
