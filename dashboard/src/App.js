import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./components/dashboard/index";
import Login from "./components/login";
import Users from "./components/users/users";
import Register from "./components/register";
import Logout from "./components/logout";

import { UserProvider } from "./contexts/userContext";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <React.Fragment>
      <Router>
        <UserProvider>
          <Switch>
            {/* ==== Public Route Section ==== */}
            <Route exact={true} path="/" component={Login} />
            <PublicRoute restricted={true} path="/login" component={Login} />
            <PublicRoute
              restricted={true}
              path="/register"
              component={Register}
            />

            {/* ==== Private Route Section ==== */}
            {/* <PrivateRoute exact={true} path="/logout" component={Logout} /> */}
            {/* <PrivateRoute exact={true} path="/" component={Dashboard} /> */}
            <PrivateRoute exact={true} path="/dashboard" component={Index} />
            <PrivateRoute path="/dashboard/students" component={Users} />
          </Switch>
        </UserProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
