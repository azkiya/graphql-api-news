import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { merge } from 'lodash';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import rootTypeDefs from './graphql/types/root';
import { userTypeDefs } from './graphql/types/user';
import { newsTypeDefs } from './graphql/types/news';
import { topicTypeDefs } from './graphql/types/topic';
import { userResolvers } from './graphql/resolvers/user';
import { newsResolvers } from './graphql/resolvers/news';
import { topicResolvers } from './graphql/resolvers/topic';

import User from './models/user';
import config from './config/config';

/**
 * Connect to the mongodb database using
 * the mongoose library.
 */
mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true }
);

/**
 * Declare the schema which the will hold our
 * GraphQL types and resolvers.
 */
const schema = makeExecutableSchema({
  typeDefs: [ rootTypeDefs, userTypeDefs, newsTypeDefs, topicTypeDefs],
  resolvers: merge(userResolvers, newsResolvers, topicResolvers),
});

/**
 * Create the server which we will send our
 * GraphQL queries to.
 */
const server = new ApolloServer({
  schema,
  formatError(error) {
    console.log(error);
    return error;
  },
  async context({ req }) {
    const isToken = req && req.headers && req.headers.authorization;

    if (isToken) {
      const token = isToken.split(' ')[1];
      const data = jwt.verify(token, config.token);

      const user = data.id ? await User.findById(data.id) : null;
      return { user };
    }
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
