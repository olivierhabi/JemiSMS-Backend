import database from "../models";

class ContactService {
  static async addContact(newContact, next) {
    const { name, phone, id } = newContact;
    try {
      return await database.Contact.create({
        name: name,
        phone: phone,
        userId: id
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
  static async deleteContact(id, next) {
    try {
      return await database.Contact.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw error;
    }
  }
  static async getOneContact(id, next) {
    try {
      return await database.Contact.findOne({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw error;
    }
  }
  static async updateContact(contactData, next) {
    const { name, phone, contactId } = contactData;
    try {
      return await database.Contact.update(
        {
          name: name,
          phone: phone
        },
        { where: { id: contactId }, returning: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default ContactService;
