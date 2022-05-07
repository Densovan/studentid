const graphql = require("graphql");
const Product = require("../../models/product");

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve: (parent) => {
        return Product.find({ categoriesId: parent.id });
      },
    },
    message: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

module.exports = CategoryType;
const ProductType = require("./product");
