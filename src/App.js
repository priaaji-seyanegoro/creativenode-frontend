import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Header } from "./components/headers/header-component";
import { Home } from "./pages/home-page";
import { Discovery } from "./pages/discovery-page";
import { ContactUs } from "./pages/contactus-page";
import { SignInSignUp } from "./pages/signIn-signUp-page";
import { Dashboard } from "./pages/dashboard-page";
import { Episodes } from "./pages/episodes-page";
import { PodcastDetail } from "./pages/podcastDetail-page";
import { NotMatch } from "./components/notmatch/notmatch-component";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";

import Cookie from "js-cookie";

import { PrivateRoute } from "./components/private-route";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const readCookie = () => {
    const user = Cookie.get("token");
    if (user) {
      dispatch(setCurrentUser(true));
    }
  };

  useEffect(readCookie, []);

  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            Cookie.get("token") && currentUser ? (
              <Redirect to="/dashboard" />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/discovery" component={Discovery} />
        <Route path="/contactus" component={ContactUs} />
        <Route
          path="/signin"
          render={() =>
            Cookie.get("token") && currentUser ? (
              <Redirect to="/dashboard" />
            ) : (
              <SignInSignUp />
            )
          }
        />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/episodes">
          <Episodes />
        </PrivateRoute>

        <Route
          path="/podcast/show/:podcastId"
          exact
          component={PodcastDetail}
        />

        <Route path="*" component={NotMatch} />
      </Switch>
    </>
  );
}

export default App;
