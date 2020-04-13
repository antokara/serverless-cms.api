import { IResolvers, IEnumResolver } from 'graphql-tools';
import { DynamoDB } from 'aws-sdk';
import { TContext } from 'resources/publicGraphql/apolloServer/context';

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    hello: async (
      parent: IEnumResolver,
      args: undefined,
      ctx: TContext,
    ): Promise<String | undefined> => {
      const params: DynamoDB.Types.GetItemInput = {
        Key: {
          itemKey: {
            S: 'test-key-1',
          },
        },
        TableName: 'items',
      };

      try {
        const data: DynamoDB.GetItemOutput = await ctx.dynamoDB
          .getItem(params)
          .promise();
        return Promise.resolve(data?.Item?.value.S);
      } catch (e) {
        return Promise.resolve(e.message);
      }
    },
  },
};

export { resolvers };
