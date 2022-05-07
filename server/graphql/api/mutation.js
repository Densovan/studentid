require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const UserType = require("../types/users");

const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} = graphql;

const { ACCESS_TOKEN_SECRET } = process.env;

const create = (message) => {
  return `This ${message} created with successfully`;
};
const update = (message) => {
  return `This ${message} updated with successfully`;
};
const deleted = (message) => {
  return `This ${message} deleted with successfully`;
};

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    // ========= User Section =========
    createUser: {
      type: UserType,
      args: {
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          // Check Email
          const isEmail = await User.findOne({ email: args.email });
          if (isEmail) {
            throw new Error("An account with this email already exist.");
          }
          if (args.password.length < 5) {
            throw new Error(
              "The password needs to be at least 5 characters long."
            );
          }
          // Hash the password
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash(args.password, saltRounds);
          const user = new User({ ...args, password: hashPassword });
          await user.save();
          return { message: create("user") };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        const { email, password } = args;
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw "Invalid email or password.";
          } else {
            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
              throw "Invalid email or password.";
            } else {
              const token = jwt.sign(
                {
                  email,
                  fullname: user.fullname,
                  avatar: user.avatar,
                  id: user._id,
                },
                ACCESS_TOKEN_SECRET
              );

              // context.res.cookie('token', token, {
              //   httpOnly: true,
              //   secure: false,
              //   maxAge: 1000 * 60 * 60 * 24 * 7,
              // });

              return {
                email,
                fullname: user.fullname,
                avatar: user.avatar,
                id: user._id,
                message: "Your Account login successfully.",
                statusCode: 200,
                token,
              };
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    // ===== User Section =====
    update_user: {
      type: UserType,
      args: {
        fullname: { type: GraphQLString },
        avatar: { type: GraphQLString },
        email: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        password: { type: GraphQLString },
        confirmPassword: { type: GraphQLString },
      },
      resolve: async (root, args, context) => {
        const { email, oldPassword, password, confirmPassword } = args;
        const user = await User.findOne({ email });
        try {
          if (!user) {
            throw new Error("The user with this email does not exist.");
          }
          if (oldPassword) {
            const isPassword = await bcrypt.compare(oldPassword, user.password);
            if (isPassword) {
              if (password === confirmPassword) {
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(password, saltRounds);
                await User.findByIdAndUpdate(
                  { _id: context.id },
                  { ...args, password: hashPassword }
                );
                return {
                  message: "The user info update with successfully.",
                  statusCode: 200,
                };
              }
              return {
                message: "The password not match!",
                statusCode: 400,
              };
            }
            return {
              message: "Invalid old password",
              statusCode: 400,
            };
          } else {
            await User.findByIdAndUpdate(
              { _id: context.id },
              { ...args, password: user.password }
            );
            return {
              message: "The user info update with successfully.",
              statusCode: 200,
            };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  },
});
module.exports = RootMutation;
