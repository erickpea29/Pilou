"use client";

import { gql, DocumentNode } from "@apollo/client";

export const updateUserMutation: DocumentNode = gql`
  mutation updateUser(
    $id: String!
    $name: String!
    $emergency_contact: String!
    $emergency_number: Float!
    $blood_type: String!
  ) {
    updateUser(
      id: $id
      newUser: {
        name: $name
        emergency_contact: $emergency_contact
        emergency_number: $emergency_number
        blood_type: $blood_type
      }
    ) {
      id
      name
      emergency_contact
      emergency_number
      blood_type
    }
  }
`;
