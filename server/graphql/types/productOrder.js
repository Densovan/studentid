const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const ProductOrderType = new GraphQLObjectType({
  name: "ProductOrder",
  fields: () => ({
    id: { type: GraphQLString },
    qty: { type: GraphQLInt },
    productsId: { type: GraphQLString },
  }),
});

module.exports = ProductOrderType;
