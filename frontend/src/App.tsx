import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DriverView } from "./components/DriverView";
import { LandingView } from "./components/Landing";
import { NotFound } from "./components/NotFound";
import { AppView } from "./components/AppView";


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingView}/>
      <Route path="/app" component={AppView}/>
      <Route path="/driver" component={DriverView}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

export default App;
