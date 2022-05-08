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
    admins: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({ role: "admin" }).sort({ created_at: -1 });
      },
    },
    admin: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(root, args, context) {
        return User.findById({ _id: args.id });
      },
    },
    students: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({ role: "student" }).sort({ created_at: -1 });
      },
    },
    student: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(root, args, context) {
        return User.findById({ _id: args.id });
      },
    },
  },
});

module.exports = RootQuery;
