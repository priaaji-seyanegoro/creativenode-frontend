import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header } from "./components/headers/header-component";
import { Home } from "./pages/home-page";
import { Discovery } from "./pages/discovery-page";
import { ContactUs } from "./pages/contactus-page";
import { SignInSignUp } from "./pages/signIn-signUp-page";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/signin" component={SignInSignUp} />
      </Switch>
    </div>
  );
}

export default App;
