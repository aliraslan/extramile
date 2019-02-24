import { HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
// import { WebSocketLink } from 'apollo-link-ws';
//
// import { split } from 'apollo-link';
// import { getMainDefinition } from 'apollo-utilities';


const httpLink = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL!,
  credentials: "include",
});


// const wsLink = new WebSocketLink({
//   uri: process.env.REACT_APP_SERVER_URL_WS!,
//   options: {
//     reconnect: true,
//     reconnectionAttempts: 20,
//     connectionCallback: ((error, result) => {
//       console.log(`ERROR ${JSON.stringify(error)}`)
//     })
//   }
// });

// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     // @ts-ignore
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   // wsLink,
//   httpLink,
// );
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});