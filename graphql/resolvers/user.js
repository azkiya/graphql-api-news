import jwt from 'jsonwebtoken';
import User from '../../models/user';
import config from '../../config/config';
import bcrypt from "bcrypt";

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const userResolvers = {
  Query: {
    async users(_, { filter = {} }) {
      const users = await User.find({},null,filter);
      return users.map(user => user.toObject());
    },
    async user(_, { searchBy }) {
    
      const user = await User.findOne(searchBy);
      return user;
    },
  },
  Mutation: {
    async addUser(_, { input } ) {
      const user = await User.create(input);
      return user.toObject();
    },
    async editUser(_, { id, input }) {
      const user = await User.findOneAndUpdate(id, input);
      return user.toObject();
    },
    async deleteUser(_, { id  }) {
      const user = await User.findByIdAndUpdate(id);
      return user.toObject();
    },
  },
};
