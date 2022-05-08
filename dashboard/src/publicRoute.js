import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./contexts/userContext";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { isLogin } = useContext(UserContext);

  return (
    // <Route
    //   {...rest}

    //   exact={true}
    //   render={(props) => <Component {...props} />}
    // />
    <Route
      {...rest}
      render={(props) =>
        isLogin && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
