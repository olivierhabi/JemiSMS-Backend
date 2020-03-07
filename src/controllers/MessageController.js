import MessageService from "../services/MessageService";
import path from "path";
import { spawn } from "child_process";

class MessageController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} message object
   */
  static async AddMessage(req, res) {
    const { phone: recipients, sender, message } = req.body;
    const { id } = req.user;
    try {
      function runScript() {
        return spawn("python", [
          path.join(__dirname, "../python-req/request.py"),
          recipients,
          message,
          sender
        ]);
      }
      const subprocess = runScript();
      subprocess.stdout.on("data", async data => {
        // console.log(`data:${data}`);
        var decod = JSON.parse(data);
        if (decod.success) {
          console.log(decod);
          const msg = decod.details[0].message;
          const cost = decod.details[0].cost;
          const status = decod.details[0].status;
          const receipient = decod.details[0].receipient;
          const balance = decod.summary.balance;
          const dataMessage = await MessageService.addMessage({
            balance,
            cost,
            status,
            receipient,
            sender,
            msg,
            id
          });
          return res.status(200).send({
            status: 200,
            message: "Message sent",
            dataMessage
          });
        }
        // res.send({ data: decod.success });
      });
    } catch (error) {
      console.log(error);
    }
    // try {
    //   var spawn = require("child_process").spawn;
    //   var process = spawn("python", [
    //     "../python-req/request.py",
    //     phone,
    //     sender,
    //     message
    //   ]);
    //   console.log(phone, sender, message);
    //   process.stdout.on("data", function(data) {
    //     // var decod = JSON.parse(data);
    //     // console.log(decod.response[0].errors.action);
    //     // res.send(decod.response[0].errors);
    //     return res.send(data);
    //   });
    //   // const dataMessage = await MessageService.addMessage({
    //   //   phone,
    //   //   sender,
    //   //   message,
    //   //   id
    //   // });
    //   // return res.status(200).send({
    //   //   status: 200,
    //   //   message: "Message sent",
    //   //   dataMessage
    //   // });
    // } catch (e) {
    //   console.log(e);
    //   // console.log(e.errors[0].message);
    //   return;
    //   // res
    //   //   .status(400)
    //   //   .send({ status: 400, message: e.errors[0].message });
    // }
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
