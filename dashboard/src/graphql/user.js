import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
    }
  }
`;

const GET_USER = gql`
  query {
    user {
      fullname
      avatar
      email
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      id
      role
      fullname
      email
      avatar
      created_at
    }
  }
`;

const DELETE_USER = gql`
  mutation ($id: String!) {
    deleteUser(id: $id) {
      message
    }
  }
`;

const UPDATE_USER = gql`
  mutation (
    $fullname: String
    $avatar: String
    $email: String
    $oldPassword: String
    $password: String
    $confirmPassword: String
  ) {
    update_user(
      fullname: $fullname
      avatar: $avatar
      email: $email
      oldPassword: $oldPassword
      password: $password
      confirmPassword: $confirmPassword
    ) {
      message
      statusCode
    }
  }
`;

const SWITCH_ROLE = gql`
  mutation ($id: String!, $role: String) {
    switchRole(id: $id, role: $role) {
      message
      statusCode
    }
  }
`;

export { LOGIN, GET_USERS, GET_USER, DELETE_USER, UPDATE_USER, SWITCH_ROLE };
