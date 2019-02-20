import React from "react";
import { HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DriverView } from "./components/DriverView";
import { LandingView } from "./components/Landing";
import { NotFound } from "./components/NotFound";
import { Login } from "./components/Login";
import { MapView } from "./components/Map";
import "./App.css";
import { Register } from "./components/Register";
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
        <Route exact path="/" component={LandingView} />
        <Route path="/driver" component={DriverView} />
        <Route path="/app" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/map" component={MapView} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
