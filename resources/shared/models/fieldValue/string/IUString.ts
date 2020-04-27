import { IFieldValue } from 'resources/shared/models/fieldValue/IFieldValue';

/**
 * Unlocalized String field value
 */
interface IUString extends IFieldValue {
  uStringValue: string;
}

export { IUString };
