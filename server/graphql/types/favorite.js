const graphql = require("graphql");
const Product = require("../../models/product");
const User = require("../../models/user");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const FavoriteType = new GraphQLObjectType({
  name: "Favorite",
  fields: () => ({
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    productId: { type: GraphQLString },
    status: { type: GraphQLString },
    message: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

module.exports = FavoriteType;
const ProductType = require("./product");
const UserType = require("./users");
