import { DynamoDB } from 'aws-sdk';

const dynamoDBclientConfig: DynamoDB.ClientConfiguration = {
  apiVersion: process.env.AWS_DYNAMODB_API_VERSION,
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
};

export { dynamoDBclientConfig };
