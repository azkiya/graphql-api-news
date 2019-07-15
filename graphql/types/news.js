/**
 * Export a string which contains our GraphQL type definitions.
 */
export const newsTypeDefs = `

  type News {
    _id: ID!
    title: String
    content: String
    author: User   
    status: String
    topic: [Topic]
    createdAt: String
    updatedAt: String
  }

  input NewsFilterInput {
    limit: Int
  }
  input NewsSearchBy { 
    _id: String
  }

  # Extending the root Query type.
  extend type Query {
    news(searchBy:NewsSearchBy): News
    allNews(filter: NewsFilterInput): [News]
  }

  # We do not need to check if any of the input parameters exist with a "!" character.
  # This is because mongoose will do this for us, and it also means we can use the same
  # input on both the "addANews" and "editNews" methods.
  input NewsInput {
    title: String
    content: String
    author: ID!
    status: String
    topic: [ID!]
    createdAt: String
    updatedAt: String
  }

  input NewsEdit {
    title: String
    content: String
    author: ID
    status: String
    topic: [ID]
    createdAt: String
    updatedAt: String
  }

  # Extending the root Mutation type.
  extend type Mutation {
    addNews(input: NewsInput!): News
    editNews(id: String!, input: NewsEdit!): News
    deleteNews(id: String!): News
  }
`;