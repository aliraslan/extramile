import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";
import * as Express from "express";
import { createConnection } from "typeorm";
import * as session from "express-session";
import * as path from "path";
import {
  BusResolver,
  DriverResolver,
  FeedbackResolver,
  ReservationResolver,
  TripResolver,
  UserResolver
} from "./resolvers";
import * as connectRedis from 'connect-redis';
import { redis } from "./redis";
import { createServer } from "http";


@Resolver()
export class ConnectionResolver {
  @Query(() => String)
  async Connection() {
    return "Connected!";
  }
}

// TODO check if parcel or webpack can bundle the backend into a single file.

const main: any = async () => {
  await createConnection(process.env.NODE_ENV == "production" ? "production" : "default");
  // TODO (IMPORTANT) add lazy column and table joining depending
  //  on the query i.e. if a `current` query requests the trips
  //  automatically join the trips column. instead of proactively doing it.

  const schema = await buildSchema({
    resolvers: [
      ConnectionResolver,
      UserResolver,
      TripResolver,
      FeedbackResolver,
      BusResolver,
      DriverResolver,
      ReservationResolver
    ]
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV != 'production',
    context: ({ req }: any) => ({ req })
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      secret: "shh",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 31536000000 // one year
      }
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true },
    path: process.env.NODE_ENV == "production" ? "/" : ""
  });

  // i genuinely hate myself for writing this piece of shit but it works
  if (process.env.NODE_ENV == "production") {
    // New Express app that will handle the static files.
    const App = Express();

    // let "child" app handle graphql
    App.post("/graphql", app);

    App.use(Express.static(path.resolve(__dirname, "public")));
    App.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });

    const httpServer = createServer(App);
    apolloServer.installSubscriptionHandlers(httpServer);

    httpServer.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is running, GraphQL Endpoint available at http://localhost:4000${
          apolloServer.graphqlPath
          }`
      );
    });
  } else {
    // Had to do this. because we're using apollo-server-express.
    // https://www.apollographql.com/docs/apollo-server/features/subscriptions.html#
    const httpServer = createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    httpServer.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is running, GraphQL Playground available at http://localhost:4000${
          apolloServer.graphqlPath
          }`
      );
    });
  }
};

main();
