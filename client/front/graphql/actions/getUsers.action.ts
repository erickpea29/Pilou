import { gql, DocumentNode } from "@apollo/client";

export const GET_USERS: DocumentNode = gql`
  query {
    getUsers {
      id
      name
      email
      password
      phone_number
      emergency_contact
      emergency_number
      blood_type
      role
    }
  }
`;
