import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { EStatus } from 'resources/shared/models/EStatus';

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
}

/**
 * parses the attributeMap provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeMap: (menu: AttributeMap) => IMenu = (
  menu: AttributeMap,
): IMenu => ({
  id: menu.id.S ?? '',
  title: menu.title.S ?? '',
  description: menu.description.S ?? '',
  pStatus: EStatus[(menu.pStatus.S as keyof typeof EStatus) ?? EStatus.DRAFT],
  expandLevels: Number(menu.expandLevels.N) ?? 0,
  minPages: Number(menu.minPages.N) ?? 0,
  maxPages: Number(menu.maxPages.N) ?? 0,
});

export { IMenu, parseAttributeMap };
