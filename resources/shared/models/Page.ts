import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { EStatus } from 'resources/shared/models/EStatus';
import { ILocalizedString } from 'resources/shared/models/ILocalizedString';
import { IFieldValue } from 'resources/shared/models/IFieldValue';

interface IMeta {
  title: ILocalizedString;
  description: ILocalizedString;
  keywords: ILocalizedString;
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
  // fieldValues: [IFieldValue];
  // url: [ILocalizedString];
  // meta: [IMeta];
}

/**
 * parses the attributeMap provided by the DynamoDB output and
 * returns the interface model that the Apollo Resolver expects
 */
const parseAttributeMap: (page: AttributeMap) => IPage = (
  page: AttributeMap,
): IPage => ({
  id: page.id.S ?? '',
  title: page.title.S ?? '',
  description: page.description.S ?? '',
  pStatus: EStatus[(page.pStatus.S as keyof typeof EStatus) ?? EStatus.DRAFT],
  pageTypeId: page.pageTypeId.S ?? '',
  // fieldValues: page.fieldValues.S,
});

export { IMeta, IPage, parseAttributeMap };
