import { gql } from "@apollo/client";
const UPDATE_STUDENT = gql`
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
    update_student(
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
const CREATE_STUDENT = gql`
  mutation (
    $fullname: String!
    $avatar: String
    $email: String!
    $password: String!
    $dob: String
    $gender: String
    $qr: String
  ) {
    create_student(
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

const GET_STUDENTS = gql`
  query {
    students {
      id
      fullname
      studentId
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
const GET_STUDENT = gql`
  query ($id: String) {
    student(id: $id) {
      id
      studentId
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
const DELETE_USER = gql`
  mutation ($id: String!) {
    deleteUser(id: $id) {
      message
    }
  }
`;

export {
  CREATE_STUDENT,
  UPDATE_STUDENT,
  GET_STUDENTS,
  GET_STUDENT,
  DELETE_USER,
};
