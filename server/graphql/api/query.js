const graphql = require("graphql");
const axios = require("axios");
// ======== Models Section =========
const User = require("../../models/user");

// ======== Type Section =========
const UserType = require("../types/users");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

// const client = createClient();

const params = {
  api_key: "BFDA85E74A8C43D48E5364795D0A090F",
  type: "product",
  amazon_domain: "amazon.com",
  asin: "B073JYC4XM",
};

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // ===== Query User =====
    user: {
      type: UserType,
      resolve(root, args, context) {
        return User.findById(context.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find();
      },
    },
  },
});

module.exports = RootQuery;
