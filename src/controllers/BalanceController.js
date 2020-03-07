import dotenv from "dotenv";
import BalanceService from "../services/BalanceService";

dotenv.config();

class BalanceController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} object
   */
  static async GetBalance(req, res) {
    console.log("Hello get balance");
    return res.send({ message: "Hello get balance" });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} object
   */
  static async AddBalance(req, res) {
    // const { balance } = req.body;
    try {
      const data = await BalanceService.addBalance({
        balance: 0
      });
      console.log("Balance added");
      // return res.status(201).send({
      //   status: 200,
      //   message: "Balance Added Successfull",
      //   data
      // });
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} object
   */
  static async RemoveBalance(req, res) {
    return res.send({ message: "Hello remove balance" });
  }
}

export default BalanceController;
