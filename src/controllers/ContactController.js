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
        status: 202,
        message: "Contact of the user",
        contactData
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default ContactController;
