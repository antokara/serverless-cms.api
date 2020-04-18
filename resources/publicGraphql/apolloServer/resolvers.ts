import { IResolvers, IEnumResolver } from 'graphql-tools';
import { ScanOutput, ScanInput } from 'aws-sdk/clients/dynamodb';
import { TContext } from 'resources/publicGraphql/apolloServer/context';
import { ILanguage, parseAttributeMap } from 'resources/shared/models/Language';

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    languages: async (
      parent: IEnumResolver,
      args: undefined,
      ctx: TContext,
    ): Promise<ILanguage[]> => {
      const params: ScanInput = {
        TableName: 'languages',
      };

      try {
        const data: ScanOutput = await ctx.dynamoDB.scan(params).promise();
        return Promise.resolve(data?.Items?.map(parseAttributeMap) ?? []);
      } catch (e) {
        return Promise.resolve(e.message);
      }
    },
  },
};

export { resolvers };
