import { APIGatewayProxyHandler } from 'aws-lambda';

type TExport = {
  handler: APIGatewayProxyHandler;
};

export { TExport };
