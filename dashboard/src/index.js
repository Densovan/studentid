import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const { REACT_APP_LOCAL, REACT_APP_PRO } = process.env;
const apiUrl =
  process.env.NODE_ENV === "production" ? REACT_APP_PRO : REACT_APP_LOCAL;

const client = new ApolloClient({
  // uri: `https://id.saladigital.org/admin`,
  uri: `${apiUrl}/admin`,
  credentials: "include",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
