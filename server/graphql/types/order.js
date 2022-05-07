const graphql = require("graphql");
const Product = require("../../models/product");
const User = require("../../models/user");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    phone: { type: GraphQLString },
    productsId: { type: new GraphQLList(GraphQLString) },
    amount: { type: GraphQLInt },
    contacted: { type: GraphQLBoolean },
    // customer_name: { type: GraphQLString },
    status: { type: GraphQLString },
    address: { type: GraphQLString },
    message: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    qty: { type: new GraphQLList(GraphQLInt) },
    products: {
      type: new GraphQLList(ProductType),
      resolve: (parent) => {
        return Product.find({ _id: parent.productsId });
      },
    },
    thumbnail: {
      type: new GraphQLList(ProductType),
      resolve: (parent) => {
        return Product.find({ _id: parent.productsId });
      },
    },
    customer_name: {
      type: UserType,
      resolve: (parent) => {
        return User.findById({ _id: parent.userId });
      },
    },
  }),
});

module.exports = OrderType;
const ProductType = require("./product");
const UserType = require("./users");
