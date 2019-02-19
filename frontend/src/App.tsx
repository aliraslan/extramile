import React from 'react';
import { HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DriverView } from "./components/DriverView";
import { LandingView } from "./components/Landing";
import { NotFound } from "./components/NotFound";
import { AppView } from "./components/AppView";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingView}/>
        <Route path="/app" component={AppView}/>
        <Route path="/driver" component={DriverView}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
