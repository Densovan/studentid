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
export { GET_ADMINS };
