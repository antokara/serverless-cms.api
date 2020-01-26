// const url = 'http://checkip.amazonaws.com/';
import { ApolloServer, gql } from 'apollo-server-lambda';
import { DocumentNode } from 'graphql';
import { IResolvers } from 'graphql-tools';

// TODO: use babel ts and fork for ts validation

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
// Construct a schema, using GraphQL schema language
const typeDefs: DocumentNode = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    hello: () => 'GraphQL TS!',
  },
};

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });

exports.lambdaHandler = server.createHandler();
