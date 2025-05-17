import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  input RegisterInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
  }

  type Query {
    _empty: String
  }
`;
