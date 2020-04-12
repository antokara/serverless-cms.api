import { DynamoDB } from 'aws-sdk';

const dynamoDBclientConfig: DynamoDB.ClientConfiguration = {
  apiVersion: '2012-08-10',
  endpoint: 'http://192.168.86.82:8000',
};

export { dynamoDBclientConfig };
