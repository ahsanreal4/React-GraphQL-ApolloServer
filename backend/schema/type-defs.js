const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type GetAllUsersResponse {
    users: [User!]!
    dataSize: Int!
  }

  type Query {
    users(limit: Int!, offset: Int!): GetAllUsersResponse
    user(id: ID!): User
    movies: [Movie!]!
    movie(name: String!): Movie
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = BRAZIL
  }

  input UpdateUsernameInput {
    id: ID!
    username: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUsername(input: UpdateUsernameInput!): User!
    deleteUser(id: ID!): User
  }

  enum Nationality {
    GERMANY
    CANADA
    BRAZIL
    INDIA
    CHILE
  }
`

module.exports = { typeDefs }
