import React from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components/headers/header-component";
import { Home } from "./pages/home-page";
import { Discovery } from "./pages/discovery-page";
import { ContactUs } from "./pages/contactus-page";
import { SignInSignUp } from "./pages/signIn-signUp-page";
import { Dashboard } from "./pages/dashboard-page";
import { PodcastDetail } from "./pages/podcastDetail-page";
import { NotMatch } from "./components/notmatch/notmatch-component";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/signin" component={SignInSignUp} />
        <Route path="/dashboard" component={Dashboard} />
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
