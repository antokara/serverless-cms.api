import { ApolloServer } from 'apollo-server-lambda';
import { awsConfig } from 'resources/shared/awsConfig';
import { context } from 'resources/publicGraphql/apolloServer/context';
import { typeDefs } from 'resources/publicGraphql/apolloServer/typeDefs/index';
import { resolvers } from 'resources/publicGraphql/apolloServer/resolvers/index';

awsConfig.update({});

const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

export { apolloServer };
