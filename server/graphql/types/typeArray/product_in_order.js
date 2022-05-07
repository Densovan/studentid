const graphql = require("graphql");
const Product = require("../../../models/product");

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const Prodcut_in_orderType = new GraphQLObjectType({
  name: "ProductInOrder",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    // products: {
    //   type: new GraphQLList(ProductType),
    //   resolve: (parent) => {
    //     return Product.find({ productId: parent.id });
    //   },
    // },
    message: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

module.exports = Prodcut_in_orderType;
const ProductType = require("../product");
