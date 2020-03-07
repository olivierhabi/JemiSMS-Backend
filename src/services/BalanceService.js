import database from "../models";

class BalanceService {
  static async incBalance(newBalance, next) {
    const { balance, id } = newBalance;
    try {
      await database.Balance.increment(["balance"], {
        by: balance,
        where: { userId: id },
        returning: true
      });
    } catch (error) {
      throw error;
    }
  }
  static async addBalance(newBalance, next) {
    const { balance, id } = newBalance;
    try {
      await database.Balance.create({
        balance: balance,
        userId: id
      });
    } catch (error) {
      throw error;
    }
  }
  static async getOneBalance(id, next) {
    try {
      return await database.Balance.findOne({
        where: {
          userId: id
        }
      });
    } catch (error) {
      throw error;
    }
  }
  static async decBalance(dataDecrement, next) {
    const { amount, id } = dataDecrement;
    try {
      await database.Balance.decrement(["balance"], {
        by: amount,
        where: { userId: id },
        returning: true
      });
    } catch (error) {
      throw error;
    }
  }
}

export default BalanceService;
