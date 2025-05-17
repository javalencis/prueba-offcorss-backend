import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
  input UpdateUserInput {
    username: String
    firstName: String
    lastName: String
    email: String
  }
  type Mutation {
    registerUser(input: RegisterInput!): User!
    loginUser(input: LoginInput!): AuthPayload!
    updateUser(input: UpdateUserInput!): User!
  }

  type Query {
    _: Boolean
  }
`;
