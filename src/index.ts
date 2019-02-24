import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import * as session from "express-session";
import * as path from "path";
// import * as connectRedis from 'connect-redis';
// import { redis } from "./redis";
import { createServer } from "http";
import { dbConnection } from "./dbConnection";
import { schema } from "./schema";
import queryComplexity, { fieldConfigEstimator, simpleEstimator } from "graphql-query-complexity";


// TODO check if parcel or webpack can bundle the backend into a single file.

const main: any = async () => {
  await dbConnection();
  // get node environment
  const environment = process.env.NODE_ENV;

  const apolloServer = new ApolloServer({
    schema: await schema,
    playground: environment != 'production', // disable if in production
    context: ({ req }: any) => ({ req }), // allows us to access the context (and cookies) in resolvers
    introspection: environment != 'production', // disable if in production
    tracing: environment != 'production', // disable if in production
    validationRules: [
      queryComplexity({
        // The maximum allowed query complexity, queries above this threshold will be rejected
        maximumComplexity: 10,
        // The query variables. This is needed because the variables are not available
        // in the visitor of the graphql-js library
        variables: {},
        // Optional callback function to retrieve the determined query complexity
        // Will be invoked weather the query is rejected or not
        // This can be used for logging or to implement rate limiting
        onComplete: (complexity: number) => {
          console.log("Query Complexity:", complexity);
        },
        estimators: [
          // Using fieldConfigEstimator is mandatory to make it work with type-graphql
          fieldConfigEstimator(),
          // This will assign each field a complexity of 1 if no other estimator
          // returned a value. We can define the default value for field not explicitly annotated
          simpleEstimator({
            defaultComplexity: 1
          })
        ]
      }) as any
    ]
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
  });

  // i genuinely hate myself for writing this piece of shit but it works
  if (process.env.NODE_ENV == "production") {
    // New Express app that will handle the static files.
    const App = Express();

    // let "child" app handle graphql
    App.post("/graphql", app);

    // let express handle the serving of the static files in the public dir
    App.use(Express.static(path.resolve(__dirname, "..", "public")));
    // redirect all routes to index.html because we're doing client side routing
    App.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
    });

    // create a server to handle the subscriptions as per the documentation
    const httpServer = createServer(App);
    // descriptive
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
