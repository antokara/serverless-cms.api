import { IFieldValue } from 'resources/shared/models/fieldValue/IFieldValue';
import { ILocalizedString } from 'resources/shared/models/LocalizedString';

/**
 * Localized String field value
 */
interface ILString extends IFieldValue {
  lStringValue: ILocalizedString[];
}

export { ILString };
