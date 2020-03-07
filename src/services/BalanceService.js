import database from "../models";

class BalanceService {
  static async addBalance(newBalance, next) {
    const { balance } = newBalance;
    try {
      return await database.Balance.create({
        balance: balance
      });
    } catch (error) {
      throw error;
    }
    next();
  }
}

export default BalanceService;
