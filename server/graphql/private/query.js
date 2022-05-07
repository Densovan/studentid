const graphql = require("graphql");
const moment = require("moment");

// ======== Models Section =========
const User = require("../../models/user");

// ======== Type Section =========
const UserType = require("../types/users");

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } =
  graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // ===== User Section =====
    user: {
      type: UserType,
      resolve(root, args, context) {
        return User.findById({ _id: context.id });
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
