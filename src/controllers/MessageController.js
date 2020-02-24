import MessageService from "../services/MessageService";

class MessageController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} message object
   */
  static async AddMessage(req, res) {
    const { phone, sender, message } = req.body;
    // console.log(phone, sender, message);
    const { id } = req.user;

    try {
      const dataMessage = await MessageService.addMessage({
        phone,
        sender,
        message,
        id
      });
      return res.status(200).send({
        status: 200,
        message: "Message sent",
        dataMessage
      });
    } catch (e) {
      console.log(e.errors[0].message);
      return res
        .status(400)
        .send({ status: 400, message: e.errors[0].message });
    }
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} message object
   */
  static async getMyMessage(req, res) {
    const { id } = req.user;
    console.log(id);
    try {
      const messageData = await MessageService.getMessage(id);

      if (messageData.length === 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Your message box in empty" });
      }
      console.log(messageData.length);
      return res.status(200).send({
        status: 200,
        message: "My Sent message",
        data: messageData
      });
    } catch (e) {
      // console.log(e.errors[0].message);
      return res
        .status(400)
        .send({ status: 400, message: e.errors[0].message });
    }
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} message object
   */
  static async deleteMyMessage(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    console.log(userId);
    try {
      const message = await MessageService.getOneMessage(id);
      if (!message) {
        return res.status(404).send({
          status: 404,
          message: "Message not found"
        });
      }
      if (message.dataValues.userId !== userId) {
        return res.status(404).send({
          status: 404,
          message: "You can only delete message you sent"
        });
      }
      // console.log(message.dataValues.userId);
      const dataDelete = await MessageService.deleteMessage(id);
      return res.status(200).send({
        status: 200,
        message: "Message deleted"
      });
    } catch (error) {
      // console.log(e.errors[0].message);
      return res
        .status(400)
        .send({ status: 400, message: e.errors[0].message });
    }
  }
}

export default MessageController;