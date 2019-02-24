import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { ConnectionOptions, createConnection } from "typeorm";
import * as session from "express-session";
// import * as connectRedis from 'connect-redis';
// import { redis } from "./redis";
import { createServer } from "http";
import { schema } from "./schema";
import * as cors from "cors";


// TODO check if parcel or webpack can bundle the backend into a single file.

const main: any = async () => {
  const enivroment = process.env.NODE_ENV;
  const db: ConnectionOptions | string = enivroment == "production" ? {
      type: "postgres",
      host: "localhost",
      port: 5432,
      extra: { ssl: true },
      url: process.env.DATABASE_URL,
      "synchronize": true,
      logging: "all",
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"]
    }
    : "default";
  await createConnection(db as any);
  // TODO move to redis for subscriptions instead of the default option.

  const apolloServer = new ApolloServer({
    schema: await schema,
    playground: true, // process.env.NODE_ENV != 'production',
    context: ({ req }: any) => ({ req }),
    introspection: true, // process.env.NODE_ENV != 'production',
    tracing: process.env.NODE_ENV != 'production',
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
        secure: process.env.NODE_ENV === "production",
        maxAge: 31536000000 // one year
      }
    })
  );

  app.use(cors());

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_HOST!
    },
    // path: process.env.NODE_ENV == "production" ? "/" : ""
  });

  // Had to do this. because we're using apollo-server-express.
  // https://www.apollographql.com/docs/apollo-server/features/subscriptions.html#
  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(process.env.PORT || 4000, async () => {
    console.log(
      `Server is running, GraphQL Endpoint available at http://localhost:4000${
        apolloServer.graphqlPath
        }`
    );

  });

};

main();
