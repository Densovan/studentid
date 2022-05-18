import { Route } from "react-router-dom";
import React, { useEffect } from "react";
import { Layout } from "antd";
import NavBar from "./components/layout/navbar";
import SideNavbar from "./components/layout/side-navbar";
import MyFooter from "./components/layout/footer";
import axios from "axios";

// Global varible

const { Content } = Layout;

const { REACT_APP_LOCAL, REACT_APP_PRO } = process.env;
const apiUrl =
  process.env.NODE_ENV === "production" ? REACT_APP_PRO : REACT_APP_LOCAL;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLogin, setIsLogin] = React.useState("");

  const verifyToken = async () => {
    await axios
      .get(`${apiUrl}/token/verify`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(res.data.success);
      })
      .catch(async (err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    verifyToken();
    setInterval(() => {
      verifyToken();
    }, 14 * 60 * 1000);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && (
          <Layout style={{ minHeight: "100vh" }}>
            <SideNavbar />
            <Layout>
              <NavBar />
              <Content className="content-padding">
                <Component {...props} />
              </Content>
              <MyFooter />
            </Layout>
          </Layout>
        )
      }
    />
  );
};

export default PrivateRoute;
