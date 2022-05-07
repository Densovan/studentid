import { gql } from "@apollo/client";

const ORDERS = gql`
  query {
    get_orders {
      id
      amount
      userId
      status
      created_at
      qty
      contacted
      products {
        name
        thumbnail
      }
      customer_name {
        fullname
      }
    }
  }
`;
const ORDER = gql`
  query ($id: String!) {
    get_order(id: $id) {
      id
      amount
      userId
      qty
      phone
      contacted
      created_at
      products {
        name
        thumbnail
      }
    }
  }
`;

const DELETE_ORDER = gql`
  mutation ($id: String!) {
    delete_order(id: $id) {
      message
    }
  }
`;

const STATUS_CONTACT = gql`
  mutation ($id: String!, $contacted: Boolean) {
    status_contact(id: $id, contacted: $contacted) {
      message
    }
  }
`;

export { ORDERS, ORDER, DELETE_ORDER, STATUS_CONTACT };
