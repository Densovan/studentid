import { gql, useQuery } from "@apollo/client";

const MEMBERS = gql`
  query {
    members {
      id
      key
      fullname
      thumbnail
      position
      created_at
      updated_at
    }
  }
`;

const MEMBER = gql`
  query ($id: String!) {
    member(id: $id) {
      fullname
      thumbnail
      position
      created_at
      updated_at
    }
  }
`;

const CREATE_MEMBER = gql`
  mutation ($fullname: String!, $position: String!, $thumbnail: String!) {
    createMember(
      fullname: $fullname
      position: $position
      thumbnail: $thumbnail
    ) {
      message
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation (
    $id: String!
    $fullname: String!
    $position: String!
    $thumbnail: String!
  ) {
    updateMember(
      id: $id
      fullname: $fullname
      position: $position
      thumbnail: $thumbnail
    ) {
      message
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation ($id: String!) {
    deleteMember(id: $id) {
      message
    }
  }
`;

const UPDATE_MEMBER_POSTION = gql`
  mutation ($id: String!, $key: Int!) {
    updateMemberPosition(id: $id, key: $key) {
      message
    }
  }
`;

export {
  MEMBER,
  MEMBERS,
  DELETE_MEMBER,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  UPDATE_MEMBER_POSTION,
};
