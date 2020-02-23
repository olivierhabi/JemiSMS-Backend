import database from "../models";

class MessageService {
  static async addMessage(newMessage, next) {
    const { phone, sender, message, id } = newMessage;
    try {
      return await database.Message.create({
        phone: phone,
        sender: sender,
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

  static async getOneMessage(id, next) {
    try {
      return await database.Message.findOne({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteMessage(id, next) {
    try {
      return await database.Message.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default MessageService;
