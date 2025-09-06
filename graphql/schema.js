const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
    password: String!
    favorecido: Boolean
  }

  type Transfer {
    from: String!
    to: String!
    value: Float!
    date: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users(username: String!): User
  }

  type Mutation {
    registerUser(username: String!, password: String!, favorecido: Boolean): User!
    loginUser(username: String!, password: String!): AuthPayload!
    createTransfer(from: String!, to: String!, value: Float!): Transfer!
  }
`;