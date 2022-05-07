import React, { createContext, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = React.useState(false);

  console.log("isLogin", isLogin);

  const verifyToken = async () => {
    await axios
      .get(`http://localhost:9001/token/verify`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(res.data.success);
        return;
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
    <UserContext.Provider value={{ isLogin }}>{children}</UserContext.Provider>
  );
};
