import { DocumentNode } from 'graphql';
import { queries } from 'resources/publicGraphql/apolloServer/typeDefs/queries';
import { PageFieldType } from 'resources/shared/typeDefs/types/PageFieldType';
import { LString as FieldValueLString } from 'resources/shared/typeDefs/types/fieldValue/string/LString';
import { LUString as FieldValueLUString } from 'resources/shared/typeDefs/types/fieldValue/string/LUString';
import { FieldValue } from 'resources/shared/typeDefs/types/fieldValue/FieldValue';
import { UString as FieldValueUString } from 'resources/shared/typeDefs/types/fieldValue/string/UString';
import { Language } from 'resources/shared/typeDefs/types/Language';
import { LocalizedString } from 'resources/shared/typeDefs/types/LocalizedString';
import { LUString } from 'resources/shared/typeDefs/types/fieldValue/string/LUString';
import { Menu } from 'resources/shared/typeDefs/types/Menu';
import { Page } from 'resources/shared/typeDefs/types/Page';
import { PageMeta } from 'resources/shared/typeDefs/types/PageMeta';
import { PageType } from 'resources/shared/typeDefs/types/PageType';
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
  LUString,
  Menu,
  Page,
  PageMeta,
  PageType,
  Status,
];

export { typeDefs };
