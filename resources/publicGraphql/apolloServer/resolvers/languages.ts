import { IEnumResolver } from 'graphql-tools';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { ILanguage, parseAttributeMap } from 'resources/shared/models/Language';
import { TResolverFn } from './TResolverFn';

/**
 * resolver function for the languages query.
 * returns the list of all languages, unsorted
 */
const languages: TResolverFn<ILanguage[]> = (
  parent: IEnumResolver,
  args: undefined,
  ctx: TContext,
): Promise<ILanguage[]> =>
  ctx.dynamoDB
    .scan({
      TableName: 'languages',
    })
    .promise()
    .then(
      (data: ScanOutput): ILanguage[] =>
        data?.Items?.map(parseAttributeMap) ?? [],
    );

export { languages };
