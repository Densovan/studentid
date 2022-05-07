import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './contexts/userContext';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const user = useContext(UserContext);

  return (
    <Route
      {...rest}
      exact={true}
      render={(props) => <Component {...props} />}
    />
  );
};

export default PublicRoute;
