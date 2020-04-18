import { IResolvers, IEnumResolver } from 'graphql-tools';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { ILanguage, parseAttributeMap } from 'resources/shared/models/Language';

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    languages: async (
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
        ),
  },
};

export { resolvers };
