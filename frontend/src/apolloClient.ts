import { HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';

import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const isLocalHost = location.hostname === "localhost";

const httpLink = new HttpLink({
  uri: isLocalHost ? "http://localhost:4000/graphql" : "/graphql"
});


const wsLink = new WebSocketLink({
  uri: isLocalHost ? "ws://localhost:4000/graphql" :
    `${location.origin.replace(/^http/, 'ws')}/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    // @ts-ignore
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});