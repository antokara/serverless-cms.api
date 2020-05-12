import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

const handler: APIGatewayProxyHandler = (
  event: APIGatewayProxyEvent,
): void | Promise<APIGatewayProxyResult> =>
  Promise.resolve({
    statusCode: 200,
    body: `retrieve file with id: ${event.queryStringParameters?.id}`,
  });

export { handler };
