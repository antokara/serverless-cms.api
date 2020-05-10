import { IEnumResolver } from 'graphql-tools';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { EStatus } from 'resources/shared/models/EStatus';
import {
  ILocalizedString,
  parseListAttributeValue as parseLocalizedStrings,
} from 'resources/shared/models/LocalizedString';
import { parseListAttributeValue as parseFieldValues } from 'resources/shared/models/fieldValue/parsers';
import { TFieldValue } from 'resources/shared/models/fieldValue/TFieldValue';
import { pageToPages } from 'resources/publicGraphql/apolloServer/resolvers/pageToPages';

interface IMeta {
  title: ILocalizedString[];
  description: ILocalizedString[];
  keywords: ILocalizedString[];
}

/**
 * interface used by the Apollo Resolver, etc.
 */
interface IPage {
  id: string;
  title: string;
  description: string;
  pStatus: EStatus;
  pageTypeId: string;
  fieldValues: TFieldValue[];
  url?: ILocalizedString[];
  meta?: IMeta;
  pages: IPage[];
  // TODO: shortcut page
}

/* 
  we have to disable this eslint rule because we need this behavior (page -> pageToPages -> page)
  @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md#when-not-to-use-it
*/
/* eslint import/no-cycle: [0] */
/**
 * parses the attributeMap provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeMap: (
  page: AttributeMap,
  parent: IEnumResolver,
  ctx: TContext,
) => Promise<IPage> = async (
  page: AttributeMap,
  parent: IEnumResolver,
  ctx: TContext,
): Promise<IPage> => ({
  id: page.id.S ?? '',
  title: page.title.S ?? '',
  description: page.description.S ?? '',
  pStatus: EStatus[(page.pStatus.S as keyof typeof EStatus) ?? EStatus.DRAFT],
  pageTypeId: page.pageTypeId.S ?? '',
  url: page.url?.L ? parseLocalizedStrings(page.url.L ?? []) : undefined,
  meta: page.meta?.M
    ? {
        title: parseLocalizedStrings(page.meta.M?.title.L ?? []),
        description: parseLocalizedStrings(page.meta.M?.description.L ?? []),
        keywords: parseLocalizedStrings(page.meta.M?.keywords.L ?? []),
      }
    : undefined,
  fieldValues: parseFieldValues(page?.fieldValues.L ?? []),
  pages:
    typeof page.id.S !== 'undefined'
      ? await pageToPages(parent, { id: page.id.S }, ctx)
      : [],
});

export { IMeta, IPage, parseAttributeMap };
