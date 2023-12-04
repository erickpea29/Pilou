"use client";

import { gql, DocumentNode } from "@apollo/client";

export const ADD_NEW_USER: DocumentNode = gql`
  mutation AddNewUser(
    $name: String!
    $emergency_contact: String!
    $emergency_number: Float!
    $blood_type: String!
  ) {
    addUser(
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
