import { APIGatewayProxyHandler } from 'aws-lambda';
import { apolloServer } from 'resources/publicGraphql/apolloServer/apolloServer';

const handler: APIGatewayProxyHandler = apolloServer.createHandler();

export { handler };
