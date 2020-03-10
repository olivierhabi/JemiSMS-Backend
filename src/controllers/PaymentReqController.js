import sha256 from "js-sha256";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import API from "../middleware/Api";

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
    const phoneIn = parseInt("25" + phone);
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
        return res.status(200).send({
          status: "200",
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default PaymentReqController;
