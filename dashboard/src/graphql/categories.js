import { gql, useQuery } from "@apollo/client";

const CATEGORIES = gql`
  query {
    categories {
      id
      title
      products {
        name
      }
      created_at
      updated_at
    }
  }
`;

const CATEGORY = gql`
  query ($id: String!) {
    category(id: $id) {
      title
    }
  }
`;

const CREATE_CATEGORIES = gql`
  mutation ($title: String!) {
    createCategory(title: $title) {
      message
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation ($title: String!, $id: String!) {
    updateCategory(id: $id, title: $title) {
      message
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation ($id: String!) {
    deleteCategory(id: $id) {
      message
    }
  }
`;

export {
  CATEGORIES,
  CREATE_CATEGORIES,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  CATEGORY,
};
