const graphql = require("graphql");
const Product = require("../../models/product");
const User = require("../../models/user");
const ProductType = require("./product");
const UserType = require("./users");
const products = require("../../data/products.json");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const CartType = new GraphQLObjectType({
  name: "Cart",
  fields: () => ({
    productId: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    thumbnail: { type: GraphQLString },
    userId: { type: GraphQLString },
    qty: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve: (parent) => {
        return User.findOne({ _id: parent.userId });
      },
    },
    products: {
      type: ProductType,
      resolve: (parent) => {
        const filter = products.products.filter((item) => item.id == parent.productId);
        if(filter.length > 0) {
          return filter[0]
        }
      },
    },
    message: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

module.exports = CartType;
