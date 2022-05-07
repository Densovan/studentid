import { gql } from '@apollo/client';

const AUTHOR = gql`
  query ($id: String!) {
    author(id: $id) {
      id
      fullname
    }
  }
`;

const AUTHORS = gql`
  query {
    authors {
      id
      fullname
      created_at
      updated_at
    }
  }
`;

const CREATE_AUTHOR = gql`
  mutation ($fullname: String!) {
    createAuthor(fullname: $fullname) {
      message
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation ($id: String!, $fullname: String!) {
    updateAuthor(id: $id, fullname: $fullname) {
      message
    }
  }
`;

const DEELTE_AUTHOR = gql`
  mutation ($id: String!) {
    deleteAuthor(id: $id) {
      message
    }
  }
`;

export { AUTHOR, AUTHORS, DEELTE_AUTHOR, CREATE_AUTHOR, UPDATE_AUTHOR };
