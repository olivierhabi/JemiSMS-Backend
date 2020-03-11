import MessageService from "../services/MessageService";
import path from "path";
import { spawn } from "child_process";
import BalanceService from "../services/BalanceService";
import dotenv from "dotenv";
import HistoryService from "../services/HistoryService";

dotenv.config();

class MessageController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} message object
   */
  static async AddMessage(req, res) {
    const { phone: recipients, sender, message } = req.body;
    const { id, username } = req.user;
    const userName = process.env.USERNAMESMS;
    const passWord = process.env.PASSWORDSMS;
    try {
      const amount = await BalanceService.getOneBalance(id);
      if (amount.balance < 0) {
        return res.status(400).send({
          status: 400,
          message: "You don't have enough balance"
        });
      }
      function runScript() {
        return spawn("python", [
          path.join(__dirname, "../python-req/request.py"),
          recipients,
          message,
          sender,
          userName,
          passWord
        ]);
      }
      const subprocess = runScript();
      subprocess.stdout.on("data", async data => {
        var decod = JSON.parse(data);
        if (!decod.success) {
          return res.status(400).send({
            status: 400,
            message: decod.response[0].errors.error
          });
        }
        if (decod.success) {
          const msg = decod.details[0].message;
          const status = decod.details[0].status;
          const receipient = decod.details[0].receipient;
          const cost = decod.details[0].status === "Q" ? "16" : "0";
          const dataMessage = await MessageService.addMessage({
            cost,
            status,
            receipient,
            sender,
            msg,
            id
          }).then(async data => {
            const transaction = "Sent SMS";
            const customer = username;
            const id = data.dataValues.userId;
            const smsQuantity = 1;

            if (data.dataValues.status === "E") {
              const amountHistory = 0;
              await HistoryService.addHistory({
                transaction,
                customer,
                amountHistory,
                smsQuantity,
                id
              });
              return data;
            }
            const amountHistory = 16;
            const amount = 1;

            await BalanceService.decBalance({
              amount,
              id
            });
            await HistoryService.addHistory({
              transaction,
              customer,
              amountHistory,
              smsQuantity,
              id
            });

            return data;
          });
          const balance = await BalanceService.getOneBalance(id).then(data => {
            return data.balance;
          });

          return res.status(200).send({
            status: 200,
            message: "Message sent",
            balance: balance,
            dataMessage
          });
        }
      });
    } catch (error) {
      console.log(error);
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
    try {
      const messageData = await MessageService.getMessage(id);

      if (messageData.length === 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Your message box in empty" });
      }
      return res.status(200).send({
        status: 200,
        message: "My Sent message",
        data: messageData
      });
    } catch (e) {
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

      const dataDelete = await MessageService.deleteMessage(id);
      return res.status(200).send({
        status: 200,
        message: "Message deleted"
      });
    } catch (error) {
      return res
        .status(400)
        .send({ status: 400, message: e.errors[0].message });
    }
  }
}

export default MessageController;
