import database from "../models";

class MessageService {
  static async addMessage(newMessage, next) {
    const { phone, message, id } = newMessage;
    try {
      return await database.Message.create({
        phone: phone,
        message: message,
        userId: id
      });
    } catch (error) {
      throw error;
    }
    next();
  }
  static async getMessage(user, next) {
    try {
      return await database.Message.findAll({
        where: {
          userId: user
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default MessageService;
