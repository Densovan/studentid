const graphql = require("graphql");
const User = require("../../models/user");
const Category = require("../../models/category");

const UserType = require("./users");
const CategoryType = require("./category");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQlBoolean } = graphql;

const TestProductType = new GraphQLObjectType({
  name: "TestProduct",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    has_children: { type: GraphQLString },
    is_root: { type: GraphQLString },
    path: { type: GraphQLString },
    link: { type: GraphQLString },
    type: { type: GraphQLString },
    domain: { type: GraphQLString },
  }),
});

module.exports = TestProductType;
