import 'reflect-metadata';

import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";
import * as Express from 'express';
import { createConnection } from "typeorm";

@Resolver()
export class ConnectionResolver {
  @Query(() => String)
  async Connection() {
    return "Connected!";
  }
}

const main: any = async () => {
  await createConnection("dev");

  const schema = await buildSchema({
    resolvers: [ConnectionResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server is running, GraphQL Playground available at http://localhost:4000/graphql`);
  });
};

main();
