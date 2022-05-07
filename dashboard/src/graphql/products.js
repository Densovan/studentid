import { gql } from "@apollo/client";

const PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      thumbnail
      categories {
        title
        id
      }
      user {
        fullname
      }
      price
      rate
      created_at
      updated_at
    }
  }
`;
const PRODUCT = gql`
  query ($id: String) {
    product(id: $id) {
      id
      name
      description
      thumbnail
      price
      rate
      categories {
        title
        id
      }
      user {
        fullname
      }
      created_at
      updated_at
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation (
    $name: String!
    $description: String
    $categoriesId: [String!]
    $thumbnail: String!
    $price: Int!
  ) {
    createProduct(
      name: $name
      description: $description
      categoriesId: $categoriesId
      thumbnail: $thumbnail
      price: $price
    ) {
      message
    }
  }
`;
const UPDATE_PRODUCT = gql`
  mutation (
    $id: String!
    $name: String!
    $description: String
    $categoriesId: [String!]
    $thumbnail: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      categoriesId: $categoriesId
      thumbnail: $thumbnail
      price: $price
    ) {
      message
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation ($id: String!) {
    deleteProduct(id: $id) {
      message
    }
  }
`;

export { PRODUCTS, PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT };
