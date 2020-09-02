import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";

export const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      Cookie.get("token") ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: location },
          }}
        />
      )
    }
  />
);
