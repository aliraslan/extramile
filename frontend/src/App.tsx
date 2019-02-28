import React from "react";

import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DriverView } from "./components/DriverView";
import { LandingView } from "./components/Landing";
import { NotFound } from "./components/NotFound";
import { LoginView } from "./components/Login";
import { MapView } from "./components/Map";
import { Register } from "./components/Register";
import { TrackTrip } from "./components/TrackTrip";
import { client } from "./apolloClient";

import "./App.css";
import { EditProfile } from "./components/EditProfile";

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingView} />
        <Route path="/driver" component={DriverView} />
        <Route path="/login" component={LoginView} />
        <Route path="/register" component={Register} />
        <Route path="/map" component={MapView} />
        <Route path="/track" component={TrackTrip} />
        <Route path="/editprofile" component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
