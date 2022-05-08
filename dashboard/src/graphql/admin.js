import { gql } from "@apollo/client";

const GET_ADMINS = gql`
  query {
    admins {
      id
      role
      fullname
      email
      avatar
      created_at
    }
  }
`;

const UPDATE_ADMIN = gql`
  mutation (
    $id: String
    $fullname: String!
    $avatar: String
    $email: String!
    $oldPassword: String
    $password: String!
    $confirmPassword: String
    $dob: String
  ) {
    update_admin(
      dob: $dob
      id: $id
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
const CREATE_ADMIN = gql`
  mutation (
    $fullname: String!
    $avatar: String
    $email: String!
    $password: String!
    $dob: String
    $gender: String
    $qr: String
  ) {
    create_admin(
      fullname: $fullname
      avatar: $avatar
      email: $email
      password: $password
      dob: $dob
      gender: $gender
      qr: $qr
    ) {
      message
      statusCode
    }
  }
`;

const GET_ADMIN = gql`
  query ($id: String) {
    admin(id: $id) {
      id
      fullname
      qr
      password
      email
      avatar
      dob
      created_at
      role
      gender
    }
  }
`;

export { CREATE_ADMIN, UPDATE_ADMIN, GET_ADMINS, GET_ADMIN };
