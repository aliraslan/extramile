import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";
import * as Express from "express";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import * as session from "express-session";
import { TripResolver } from "./resolvers/TripResolver";
import { FeedbackResolver } from "./resolvers/FeedbackResolver";
import * as path from "path";

@Resolver()
export class ConnectionResolver {
  @Query(() => String)
  async Connection() {
    return "Connected!";
  }
}

// TODO check if parcel or webpack can bundle the backend into a single file.

const main: any = async () => {
  await createConnection(process.env.NODE_ENV == "production" ? "prod" : "default");
  // TODO (IMPORTANT) add lazy column and table joining depending
  //  on the query i.e. if a `current` query requests the trips
  //  automatically join the trips column. instead of proactively doing it.

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
    playground: process.env.NODE_ENV != 'production',
    context: ({ req }: any) => ({ req })
  });

  const app = Express();
  // TODO (important, before deploying) change this to redis
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

    App.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is running, GraphQL Endpoint available at http://localhost:4000${
          apolloServer.graphqlPath
          }`
      );
    });
  } else {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is running, GraphQL Playground available at http://localhost:4000${
          apolloServer.graphqlPath
          }`
      );
    });
  }
};

main();
