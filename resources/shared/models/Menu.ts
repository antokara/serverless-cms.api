import { AttributeMap, AttributeValue } from 'aws-sdk/clients/dynamodb';
import { EStatus } from 'resources/shared/models/EStatus';
import { IPage } from 'resources/shared/models/Page';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { page as pageResolver } from 'resources/publicGraphql/apolloServer/resolvers/page';
import { IEnumResolver } from 'graphql-tools';

/**
 * interface used by the Apollo Resolver, etc.
 */
interface IMenu {
  id: string;
  title: string;
  description: string;
  pStatus: EStatus;
  expandLevels: number;
  minPages: number;
  maxPages: number;
  pages?: IPage[];
}

/**
 * parses the attributeMap provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeMap: (
  menu: AttributeMap,
  parent: IEnumResolver,
  ctx: TContext,
) => Promise<IMenu> = async (
  menu: AttributeMap,
  parent: IEnumResolver,
  ctx: TContext,
): Promise<IMenu> => ({
  id: menu.id.S ?? '',
  title: menu.title.S ?? '',
  description: menu.description.S ?? '',
  pStatus: EStatus[(menu.pStatus.S as keyof typeof EStatus) ?? EStatus.DRAFT],
  expandLevels: Number(menu.expandLevels.N) ?? 0,
  minPages: Number(menu.minPages.N) ?? 0,
  maxPages: Number(menu.maxPages.N) ?? 0,
  pages: await Promise.all<IPage | undefined>(
    menu.pages.L?.map<Promise<IPage | undefined>>(
      async (page: AttributeValue): Promise<IPage | undefined> =>
        typeof page.S !== 'undefined'
          ? pageResolver(parent, { id: page.S }, ctx)
          : Promise.resolve(undefined),
    ) ?? [],
  ).then((pages: (IPage | undefined)[]) =>
    pages.filter(
      (page: IPage | undefined): page is IPage => typeof page !== 'undefined',
    ),
  ),
});

export { IMenu, parseAttributeMap };
