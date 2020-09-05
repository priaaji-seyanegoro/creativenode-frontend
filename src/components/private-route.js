import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import Cookie from "js-cookie";

export const PrivateRoute = ({ children, ...rest }) => {
  const currentUser = useStoreState((state) => state.user.currentUser);
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
