import { ApolloServer, gql } from 'apollo-server-lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DocumentNode } from 'graphql';
import { IResolvers, IEnumResolver } from 'graphql-tools';
import { ContextFunction } from 'apollo-server-core';
import { DynamoDB } from 'aws-sdk';
import { awsConfig } from 'resources/shared/awsConfig';
import { dynamoDBclientConfig } from 'resources/shared/dynamoDBclientConfig';

awsConfig.update({});

// Construct a schema, using GraphQL schema language
const typeDefs: DocumentNode = gql`
  type Query {
    hello: String
  }
`;

type TContext = {
  dynamoDB: DynamoDB;
};

/**
 * @see https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
 */
const context: ContextFunction = (): TContext => ({
  dynamoDB: new DynamoDB(dynamoDBclientConfig),
});

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

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers, context });
const handler: APIGatewayProxyHandler = server.createHandler();

export { handler };
