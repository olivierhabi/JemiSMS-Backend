import database from "../models";

class ContactService {
  static async addContact(newContact, next) {
    const { name, phone, id } = newContact;
    try {
      return await database.Contact.create({
        name: name,
        phone: phone,
        userId: id,
        UserId: id
      });
    } catch (error) {
      throw error;
    }
    next();
  }
  static async getContact(user, next) {
    try {
      return await database.Contact.findAll({
        where: {
          userId: user
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default ContactService;
