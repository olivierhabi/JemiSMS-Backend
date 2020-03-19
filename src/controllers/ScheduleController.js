import Queue from "bull";
import moment from "moment";
import MessageService from "../services/MessageService";
import path from "path";
import { spawn } from "child_process";
import BalanceService from "../services/BalanceService";
import dotenv from "dotenv";
import HistoryService from "../services/HistoryService";
import redis from "redis";
import { v4 as uuidv4 } from "uuid";
import ScheduleService from "../services/ScheduleService";

const client = redis.createClient();

dotenv.config();

class ContactController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} object
   */
  static async AddSchedule(req, res) {
    const { title, phone: recipients, sender, message, time } = req.body;
    const { id, username } = req.user;
    const userName = process.env.USERNAMESMS;
    const passWord = process.env.PASSWORDSMS;
    const uuid = uuidv4();

    const nowDate = new Date(moment().format());
    var scheduleTime = new Date(time);

    const duration = scheduleTime.getTime() - nowDate.getTime();

    // Initiating the SMS Queue
    const sendSmsQueue = new Queue("sendSms", {
      redis: {
        host: "127.0.0.1",
        port: 6379
      }
    });

    const data = {
      title: title,
      recipients: recipients,
      sender: sender,
      message: message,
      id: id,
      uuid: uuid,
      time: time
    };
    const options = {
      delay: duration, // in ms
      attempts: 2
    };

    // Adding a SMS to the Queue
    sendSmsQueue.add(data, options);

    // .then(async x => {
    //   const { title, recipients, sender, message, id, uuid } = x.data;
    //   const status = "Queued";

    //   const schedule = await ScheduleService.addSchedule({
    //     uuid,
    //     title,
    //     recipients,
    //     sender,
    //     message,
    //     time,
    //     status,
    //     id
    //   });
    //   // console.log(schedule.dataValues);
    //   // console.log(x.data);
    // });

    sendSmsQueue.process(async job => {
      return await sendSms(job);
    });

    async function sendSms(sms) {
      const { title, recipients, sender, message, id, uuid } = sms.data;
      // console.log(uuid);

      console.log(title, recipients, sender, message);

      try {
        const amount = await BalanceService.getOneBalance(id);
        if (amount.balance <= 0) {
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
            const balance = await BalanceService.getOneBalance(id).then(
              data => {
                return data.balance;
              }
            );
            // console.log(dataMessage);

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

    return res.send({ message: "Schedule Happened" });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} object
   */
  static async getSchedule(req, res) {
    client.get("sendSms", function(err, result) {
      console.log(result);
      return res.send({ message: "happened schedule" });
    });
  }
}

export default ContactController;
