require("dotenv").config();
const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const fs = require("fs");

// ======== Models Section =========
const User = require("../../models/user");
const Test = require("../../models/test");
const Student = require("../../models/student");

// ======== Type Section =========
const UserType = require("../types/users");
const TestType = require("../types/test");
const StudentType = require("../types/student");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLID,
} = graphql;

const { ACCESS_TOKEN_SECRET } = process.env;

const opts = {
  errorCorrectionLevel: "H",
  type: "terminal",
  quality: 0.95,
  margin: 1,
  color: {
    dark: "#208698",
    light: "#FFF",
  },
};

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
    create_admin: {
      type: UserType,
      args: {
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLString },
        gender: { type: GraphQLString },
        dob: { type: GraphQLString },
        qr: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          // Check Email
          const isEmail = await User.findOne({ email: args.email });
          if (isEmail) {
            return {
              message: "An account with this email already exist.",
              statusCode: 400,
            };
          }
          if (args.password.length < 5) {
            return {
              message: "The password needs to be at least 5 characters long.",
              statusCode: 400,
            };
          }
          // Hash the password
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash(args.password, saltRounds);
          const user = new User({
            ...args,
            role: "admin",
            password: hashPassword,
          });
          await user.save();
          return { message: create("admin"), statusCode: 200 };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    update_admin: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        fullname: { type: GraphQLString },
        gender: { type: GraphQLString },
        avatar: { type: GraphQLString },
        email: { type: GraphQLString },
        dob: { type: GraphQLString },
        qr: { type: GraphQLString },
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
              { _id: args.id },
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

    create_student: {
      type: UserType,
      args: {
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLString },
        dob: { type: GraphQLString },
        qr: { type: GraphQLString },
        avatar: { type: GraphQLString },
        studentId: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          // Check Email
          const isEmail = await User.findOne({ email: args.email });
          if (isEmail) {
            return {
              message: "An account with this email already exist.",
              statusCode: 400,
            };
          }
          if (args.password.length < 5) {
            return {
              message: "The password needs to be at least 5 characters long.",
              statusCode: 400,
            };
          }
          //work random ID
          const student = await User.find({});
          const students = student.map((res) => res.studentId);
          console.log(students);
          const idd = (
            Math.floor(Math.random() * (1000000000 - 1)) + 1
          ).toString();
          console.log(idd, "idd");
          if (students.includes(`KH${idd}`)) {
            return {
              message: "StudentID was Existed please created again!",
              statusCode: 400,
            };
          }
          // Hash the password
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash(args.password, saltRounds);

          const newStudent = new User({
            ...args,
            studentId: `KH${idd}`,
            userId: context.id,
            password: hashPassword,
            // qr: await QRCode.toDataURL("hel"),
          });

          await newStudent.save();
          return { message: create("student"), statusCode: 200 };
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const { email, password } = args;
        try {
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("The user with this email does not exist.");
          }
          const isPassword = await bcrypt.compare(password, user.password);
          if (!isPassword) {
            throw new Error("The email or password is invalid.");
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
            return { token, message: "Your Account login successfully." };
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    },
    // ===== User Section =====
    update_student: {
      type: StudentType,
      args: {
        id: { type: GraphQLString },
        fullname: { type: GraphQLString },
        avatar: { type: GraphQLString },
        gender: { type: GraphQLString },
        dob: { type: GraphQLString },
        // qr: { type: GraphQLString },
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
              { _id: args.id },
              { ...args, password: user.password, userId: context.id }
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
    approveUser: {
      type: UserType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLString),
        },
        isApproved: { type: GraphQLBoolean },
      },
      resolve: async (parent, args) => {
        const { id, isApproved } = args;
        try {
          await User.findByIdAndUpdate(id, { isApproved });
          return { message: "The user has been approved with successfully." };
        } catch (error) {
          console.log(error);
        }
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        await User.findByIdAndDelete({ _id: args.id });
        return { message: deleted("user") };
      },
    },

    switchRole: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const isSuperadmin = await User.findOne({
          _id: context.id,
          role: "superadmin",
        });
        if (isSuperadmin) {
          await User.findByIdAndUpdate(
            {
              _id: args.id,
            },
            { role: args.role, userId: context.id }
          );
          return { message: "switch role successful", statusCode: 200 };
        } else {
          return { message: "You are not Superadmn", statusCode: 404 };
        }
      },
    },

    //=============test id=====================
    create_test: {
      type: TestType,
      args: {
        studentId: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const student = await Test.find({});
        const students = student.map((res) => res.studentId);
        console.log(students);
        try {
          const idd = Math.floor(Math.random() * (1000000000 - 1)) + 1;
          if (students.includes(idd))
            return {
              message: "StudentID was Existed please created again!",
              statusCode: 400,
            };
          const test = new Test({
            ...args,
            studentId: `KH${idd}`,
          });
          await test.save();
          return { message: "successfully" };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  },
});
module.exports = RootMutation;
