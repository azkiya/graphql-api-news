import News from '../../models/news';

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const newsResolvers = {
  Query: {
    async allNews(_, { filter = {} }) {
      const allNews = await News.find({},null,filter).populate('topic').populate('user');
      return allNews.map(news => news.toObject());
    },
    async news(_, { searchBy }) {
      const news = await News.findOne(searchBy).populate('topic').populate('user');
      return news;
    },
  },
  Mutation: {
    async addNews(_, { input } ) {
      const news = await News.create(input);
      return news.toObject();
    },
    async editNews(_, { id, input }) {
      const news = await News.findOneAndUpdate(id, input);
      return news.toObject();
    },
    async deleteNews(_, { id  }) {
      const news = await News.findByIdAndUpdate(id);
      return news.toObject();
    },
  },
};
