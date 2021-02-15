import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import IndexMap from "./layout/IndexMap"
import ProfilePage from "./layout/ProfilePage"
import AttributionText from "./layout/AttributionText"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <div>
            <h1 id="site-title">Capture. Share. Discover.</h1>
            <AttributionText />
          </div>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/map" component={IndexMap} user={currentUser} />
        <AuthenticatedRoute exact path="/myphotos" component={ProfilePage} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
