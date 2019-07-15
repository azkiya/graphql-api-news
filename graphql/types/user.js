/**
 * Export a string which contains our GraphQL type definitions.
 */
export const userTypeDefs = `

  type User {
    _id: ID!
    name: String
    email: String
    password: String
    createdAt: String
    updatedAt: String
  }

  type AuthData {
    id: ID
    token: String!
    tokenExpiration: Int!
  }

  input UserFilterInput {
    limit: Int
  }
  input UserSearchBy { 
    _id: String
  }

  # Extending the root Query type.
  extend type Query {
    user(searchBy:UserSearchBy): User
    users(filter: UserFilterInput): [User]
  }

  # We do not need to check if any of the input parameters exist with a "!" character.
  # This is because mongoose will do this for us, and it also means we can use the same
  # input on both the "addAUser" and "editUser" methods.
  input UserInput {
    name: String
    email: String
    password: String
    createdAt: String
    updatedAt: String
  }

  input UserEdit {
    name: String
    email: String
    password: String
    createdAt: String
    updatedAt: String
  }

  # Extending the root Mutation type.
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserEdit!): User
    deleteUser(id: String!): User
    login(email:String!, password: String!): AuthData
  }
`;