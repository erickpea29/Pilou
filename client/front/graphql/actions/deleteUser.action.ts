"use client";
import { gql, DocumentNode } from "@apollo/client";

export const DELETE_USER: DocumentNode = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
