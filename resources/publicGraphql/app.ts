import { ApolloServer, gql } from 'apollo-server-lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DocumentNode } from 'graphql';
import { IResolvers } from 'graphql-tools';

// Construct a schema, using GraphQL schema language
const typeDefs: DocumentNode = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    hello: (): string => 'GraphQL TS!',
  },
};

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
const handler: APIGatewayProxyHandler = server.createHandler();

export { handler };
