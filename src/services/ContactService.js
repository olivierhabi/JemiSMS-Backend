import database from "../models";

class ContactService {
  static async addContact(newContact, next) {
    try {
      return await database.Contact.create(newContact);
    } catch (error) {
      throw error;
    }
    next();
  }
}

export default ContactService;
