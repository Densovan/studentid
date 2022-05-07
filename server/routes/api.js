require("dotenv").config();
const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("../graphql/private/schema");
const api = require("../graphql/api/schema");
const router = new express.Router();
const isAuth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN } = process.env;

router.use(
  "/admin",
  isAuth,
  expressGraphQL((req, res) => {
    const token = req.cookies.access_token;
    const user = jwt.decode(token, ACCESS_TOKEN);

    return {
      schema,
      graphiql: true,
      context: user,
      credentials: "include",
      customFormatErrorFn: (error) => ({
        message: error.message,
      }),
    };
  })
);

router.use(
  "/api",
  expressGraphQL((req, res) => {
    // const token = req.headers["authorization"].split(" ")[1];
    // const user = jwt.decode(token, ACCESS_TOKEN);
    const token = req.cookies.access_token;
    const user = jwt.decode(token, ACCESS_TOKEN);
    return {
      schema: api,
      graphiql: true,
      context: user,
      credentials: "include",
      customFormatErrorFn: (err) => ({
        message: err.message,
        status: err.status,
      }),
    };
  })
);

module.exports = router;
