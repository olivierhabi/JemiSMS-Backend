import sha256 from "js-sha256";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import API from "../middleware/Api";
import axios from "axios";
import APITest from "../middleware/ApiTest";

dotenv.config();

class PaymentReqController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} contact object
   */
  static async ReqPayment(req, res) {
    const { phone, amount } = req.body;
    const username = process.env.USERN;
    const password = process.env.PASSW;
    const accountNumber = process.env.ACCNO;
    const phoneIn = parseInt(phone);
    const amountIn = parseInt(amount);
    const date = Date.now();
    const id = uuidv4();
    const hash = sha256(username + accountNumber + password + date);

    const options = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    API.post(
      "/",
      {
        username: username,
        timestamp: date,
        amount: amountIn,
        password: hash,
        mobilephone: phoneIn,
        requesttransactionid: id
      },
      options
    )
      .then(response => {
        console.log({ username, date, amountIn, hash, phoneIn, id });
        return res.status(200).send({
          status: "200",
          data: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} contact object
   */
  static async ReqResponse(req, res) {
    // const url = "http://localhost:5000/pay/res"
    // const options = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };

    // axios.post(url, { jsonpayload: data }, options, (verify = false));
    console.log(req.body);
    return res.send(req.body);
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} contact object
   */
  static ReqTest(req, res) {
    const options = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const username = "walter12";
    const password = "Olivier0?";

    const recipients = "0781894139";
    const message = "Hello World Test web";
    const sender = "+250780826768";

    APITest.post(
      "/.json",
      { recipients, password, sender },
      { auth: { username, password } },
      message,
      options
    )
      .then(response => {
        console.log(response);
        return;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default PaymentReqController;
