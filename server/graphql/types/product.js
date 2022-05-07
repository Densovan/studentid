const graphql = require("graphql");
const User = require("../../models/user");
const Category = require("../../models/category");

const UserType = require("./users");
const CategoryType = require("./category");
const FavoriteType = require("./favorite");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNumber } = graphql;

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    price: { type: GraphQLString },
    image: { type: GraphQLString },
    categoryId: { type: GraphQLString },
    stars: { type: GraphQLString },
    categoriesId: { type: new GraphQLList(GraphQLString) },
    description: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    userId: { type: GraphQLString },
    rate: { type: GraphQLInt },
    // favorites: { type: new GraphQLList(FavoriteType)},
    user: {
      type: UserType,
      resolve: (parent) => {
        return User.findOne({ _id: parent.userId });
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: (parent) => {
        return Category.find({ _id: parent.categoriesId });
      },
    },
    message: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

module.exports = ProductType;
