import UserService from "../services/UserService";
import hashPassword from "../helpers/hashPassword";
import BalanceService from "../services/BalanceService";
import dotenv from "dotenv";
import database from "../models";

dotenv.config();

const createAdministrator = async () => {
  const password = process.env.USER_PASSWORD;
  const username = process.env.USER_NAME;
  const email = process.env.USER_EMAIL;
  const phone = process.env.USER_PHONE;
  const admin = true;

  const hashedPassword = await hashPassword(password);
  try {
    const exists = await database.User.findOne({
      where: {
        email: email
      }
    });
    if (!exists) {
      console.log(password, username, email, phone, admin);
      await UserService.addUser({
        username,
        email,
        password: hashedPassword,
        phone,
        admin
      }).then(async user => {
        await BalanceService.addBalance({
          balance: 0,
          id: user.dataValues.id
        });
        return user;
      });
      console.log("User Doesn't exists");
    }
  } catch (e) {
    console.log(e);
  }
};

export default createAdministrator;
