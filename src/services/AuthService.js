import database from "../models";

class AuthService {
  static async findUser(email, next) {
    try {
      return await database.User.findOne({
        where: { email: email }
      });
    } catch (error) {
      throw error;
    }
    next();
  }
}

export default AuthService;
