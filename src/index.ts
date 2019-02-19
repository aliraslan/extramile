import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";
import * as Express from "express";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import * as session from "express-session";
import { TripResolver } from "./resolvers/TripResolver";
import { FeedbackResolver } from "./resolvers/FeedbackResolver";

@Resolver()
export class ConnectionResolver {
  @Query(() => String)
  async Connection() {
    return "Connected!";
  }
}

const main: any = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      ConnectionResolver,
      UserResolver,
      TripResolver,
      FeedbackResolver
    ]
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();
  app.use(
    session({
      secret: "shh",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 31536000000 // one year
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      `Server is running, GraphQL Playground available at http://localhost:4000/graphql`
    );
  });
};

main();
