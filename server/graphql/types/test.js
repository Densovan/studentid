const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;

const TestType = new GraphQLObjectType({
  name: "Test",
  fields: () => ({
    studentId: { type: GraphQLString },
    name: { type: GraphQLString },
    message: { type: GraphQLString },
    statusCode: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});

module.exports = TestType;
