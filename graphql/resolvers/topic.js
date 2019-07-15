import Topic from '../../models/topic';

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const topicResolvers = {
  Query: {
    async topics(_, { filter = {} }) {
      const topics = await Topic.find({},null,filter);
      return topics.map(topic => topic.toObject());
    },
    async topic(_, { searchBy }) {
      const topic = await Topic.findOne(searchBy);
      return topic;
    },
  },
  Mutation: {
    async addTopic(_, { input } ) {
      const topic = await Topic.create(input);
      return topic.toObject();
    },
    async editTopic(_, { id, input }) {
      const topic = await Topic.findOneAndUpdate(id, input);
      return topic.toObject();
    },
    async deleteTopic(_, { id  }) {
      const topic = await Topic.findByIdAndUpdate(id);
      return topic.toObject();
    },
  },
};
