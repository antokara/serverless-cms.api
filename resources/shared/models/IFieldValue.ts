// TODO: we need interface that is different per "key" since the value could
//       be localized, integer, etc.
interface IFieldValue {
  id: string;
  key: string;
  value: string;
}

export { IFieldValue };
