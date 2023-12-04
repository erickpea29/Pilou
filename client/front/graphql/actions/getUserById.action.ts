import { gql, DocumentNode } from "@apollo/client";

export const GET_USER_BY_ID: DocumentNode = gql`
  query getUserById($id: String!) {
    getUserById(id: $id) {
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
