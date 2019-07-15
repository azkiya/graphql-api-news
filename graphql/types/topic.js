/**
 * Export a string which contains our GraphQL type definitions.
 */
export const topicTypeDefs = `

  type Topic {
    _id: ID!
    name: String
    createdAt: String
    updatedAt: String
  }

  input TopicFilterInput {
    limit: Int
  }
  input TopicSearchBy { 
    _id: String
  }

  # Extending the root Query type.
  extend type Query {
    topic(searchBy:TopicSearchBy): Topic
    topics(filter: TopicFilterInput): [Topic]
  }

  # We do not need to check if any of the input parameters exist with a "!" character.
  # This is because mongoose will do this for us, and it also means we can use the same
  # input on both the "addATopic" and "editTopic" methods.
  input TopicInput {
    name: String
    createdAt: String
    updatedAt: String
  }

  input TopicEdit {
    name: String
    createdAt: String
    updatedAt: String
  }

  # Extending the root Mutation type.
  extend type Mutation {
    addTopic(input: TopicInput!): Topic
    editTopic(id: String!, input: TopicEdit!): Topic
    deleteTopic(id: String!): Topic
  }
`;