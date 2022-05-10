const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLString },
    studentId: { type: GraphQLString },
    role: { type: GraphQLString },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    avatar: { type: GraphQLString },
    dob: { type: GraphQLString },
    qr: { type: GraphQLString },
    gender: { type: GraphQLString },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
    statusCode: { type: GraphQLString },
    isApproved: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});

module.exports = StudentType;
