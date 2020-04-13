import { ContextFunction } from 'apollo-server-core';
import { DynamoDB } from 'aws-sdk';
import { dynamoDBclientConfig } from 'resources/shared/dynamoDBclientConfig';

type TContext = {
  dynamoDB: DynamoDB;
};

/**
 * @see https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument
 */
const context: ContextFunction = (): TContext => ({
  dynamoDB: new DynamoDB(dynamoDBclientConfig),
});

export { context, TContext };
