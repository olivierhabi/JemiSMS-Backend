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

    try {
      const createContact = await ContactService.addContact({
        name,
        phone
      });

      return res.status(201).send({
        status: 201,
        message: "Create contact successfull",
        createContact
      });
    } catch (e) {
      console.log(e);
      //   if (e.name === "SequelizeUniqueConstraintError") {
      //     const { message } = e.errors[0];
      //     let errorMessage = message;
      //     if (message === "email must be unique") {
      //       errorMessage = "The email is already taken";
      //     }
      //     if (message === "username must be unique") {
      //       errorMessage = "The username is already taken";
      //     }
      //     if (message === "phone must be unique") {
      //       errorMessage = "The phone number is already taken";
      //     }
      //     return res.status(400).send({ status: 400, message: errorMessage });
      //   }
      //   return res
      //     .status(500)
      //     .send({ status: 500, message: "INTERNAL_SERVER ERROR" });
    }
  }
}

export default ContactController;
