import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children, ...rest }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Cookie.get("token") && currentUser ? (
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
};
