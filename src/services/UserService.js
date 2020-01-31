import database from "../models";

class UserService {
  static async addUser(newUser, next) {
    try {
      return await database.User.create(newUser);
    } catch (error) {
      throw error;
    }
    next();
  }
}

export default UserService;
