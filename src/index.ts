import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";
import * as Express from "express";
import { ConnectionOptions, createConnection } from "typeorm";
import * as session from "express-session";
import * as path from "path";
import {
  BusResolver,
  DriverResolver,
  FeedbackResolver,
  ReservationResolver,
  TripResolver,
  TripStopResolver,
  UserResolver
} from "./resolvers";
// import * as connectRedis from 'connect-redis';
// import { redis } from "./redis";
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
  const db: ConnectionOptions | string = process.env.NODE_ENV == "production" ? {
      name: "production",
      type: "postgres",
      host: "localhost",
      port: 5432,
      extra: {
        ssl: true
      },
      url: process.env.DATABASE_URL,
      "synchronize": true,
      logging: "all",
      "entities": [
        "build/entity/**/*.js"
      ],
      migrations: [
        "build/migration/**/*.js"
      ]
    }
    : "default";
  await createConnection(db as any);
  // TODO move to redis for subscriptions instead of the default option.

  const schema = await buildSchema({
    resolvers: [
      TripStopResolver,
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

  // const RedisStore = connectRedis(session);

  app.use(
    session({
      // store: new RedisStore({
      //   client: redis as any
      // }),
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

    App.use(Express.static(path.resolve(__dirname, "..", "public")));
    App.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
    });

    // Handles the subscriptions
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
