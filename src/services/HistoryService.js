import database from "../models";

class HistoryService {
  static async addHistory(newHistory, next) {
    const {
      transaction,
      customer,
      amountHistory,
      smsQuantity,
      id
    } = newHistory;
    try {
      return await database.History.create({
        transaction: transaction,
        customer: customer,
        amount: amountHistory,
        smsQuantity: smsQuantity,
        userId: id
      });
    } catch (error) {
      throw error;
    }
    next();
  }

  static async getHistory(user, next) {
    try {
      return await database.History.findAll({
        where: {
          userId: user
        }
      });
    } catch (error) {}
  }
}

export default HistoryService;
