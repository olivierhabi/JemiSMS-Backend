import ContactService from "../services/ContactService";

class ContactController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} contact object
   */
  static async AddContact(req, res) {
    const { name, phone } = req.body;
    const { id } = req.user;

    try {
      const data = await ContactService.addContact({
        name,
        phone,
        id
      });
      return res.status(201).send({
        status: 201,
        message: "Create contact successfull",
        data
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getMyContact(req, res) {
    const { id } = req.user;
    console.log(id);
    try {
      const contactData = await ContactService.getContact(id);
      return res.status(200).send({
        status: 200,
        message: "My Contact",
        contactData
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteMyContact(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const contact = await ContactService.getOneContact(id);

      if (!contact) {
        return res.status(404).send({
          status: 404,
          message: "Contact not found"
        });
      }
      if (contact.dataValues.userId !== userId) {
        return res.status(404).send({
          status: 404,
          message: "You can only delete your contact"
        });
      }

      const dataDelete = await ContactService.deleteContact(id);
      return res.status(200).send({
        status: 200,
        message: "Contact deleted"
      });
    } catch (error) {}
  }
}

export default ContactController;
