import dotenv from "dotenv";
import BalanceService from "../services/BalanceService";
import HistoryService from "../services/HistoryService";

dotenv.config();

class BalanceController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} object
   */
  static async GetBalance(req, res) {
    const { id } = req.user;
    try {
      const amount = await BalanceService.getOneBalance(id);
      if (!amount) {
        return res.status(400).send({
          status: 400,
          message: "Please login to check yourBalance"
        });
      }
      if (amount.dataValues.userId !== id) {
        return res.status(400).send({
          status: 400,
          message: "You can only check your Balance"
        });
      }
      return res.status(200).send({
        status: 200,
        message: "Your Balance",
        data: amount
      });
    } catch (error) {}
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} object
   */
  static async AddBalance(req, res) {
    const { id, username } = req.user;
    const { balance } = req.body;
    const smsAmount = balance / 16;
    try {
      const userId = await BalanceService.getOneBalance(id);

      if (!userId) {
        return res.status(400).send({
          status: 400,
          message: "Please login to topup you Balance"
        });
      }
      if (userId.dataValues.userId !== id) {
        return res.status(400).send({
          status: 400,
          message: "You can only topup your Balance"
        });
      }

      const balanceData = await BalanceService.incBalance({
        balance: smsAmount,
        id: id
      }).then(async () => {
        const transaction = "Buy SMS";
        const customer = username;

        await HistoryService.addHistory({
          transaction,
          customer,
          amountHistory: balance,
          smsQuantity: smsAmount,
          id
        });
        return balance;
      });
      const amount = await BalanceService.getOneBalance(id).then(balance => {
        return balance.dataValues.balance;
      });

      return res.status(200).send({
        status: 200,
        message: "Balance Added Successfull",
        data: {
          addedAmount: balanceData,
          balance: amount
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
   * @return {object} object
   */
  static async RemoveBalance(req, res) {
    const { id } = req.user;
    const { amount } = req.body;
    try {
      const userId = await BalanceService.getOneBalance(id);

      if (!userId) {
        return res.status(400).send({
          status: 400,
          message: "Please login to you reduce your Balance "
        });
      }

      if (userId.dataValues.userId !== id) {
        return res.status(400).send({
          status: 400,
          message: "You can only reduce your Balance"
        });
      }

      const decrementBal = await BalanceService.decBalance({
        amount,
        id
      }).then(() => {
        return amount;
      });

      const amountBal = await BalanceService.getOneBalance(id).then(balance => {
        return balance.dataValues.balance;
      });

      return res.status(200).send({
        status: 200,
        message: "Balance Removed Successfull",
        data: {
          removedAmount: decrementBal,
          balance: amountBal
        }
      });
    } catch (error) {
      console.log(error);
    }
    r;
  }
}

export default BalanceController;
