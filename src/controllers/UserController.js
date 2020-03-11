import UserService from "../services/UserService";
import genToken from "../helpers/genToken";
import hashPassword from "../helpers/hashPassword";
import BalanceService from "../services/BalanceService";

class UserController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user object
   */
  static async AddUser(req, res) {
    const { username, email, password, phone } = req.body;
    const admin = false;
    const hashedPassword = await hashPassword(password);
    try {
      const createUser = await UserService.addUser({
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

      const token = genToken({ username, email, phone, admin });

      return res.status(201).send({
        status: 201,
        message: "Signup successfull",
        token: token,
        data: createUser
      });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        const { message } = e.errors[0];
        let errorMessage = message;
        if (message === "email must be unique") {
          errorMessage = "The email is already taken";
        }
        if (message === "username must be unique") {
          errorMessage = "The username is already taken";
        }
        if (message === "phone must be unique") {
          errorMessage = "The phone number is already taken";
        }
        return res.status(400).send({ status: 400, message: errorMessage });
      }
      console.log(e);
      return res
        .status(500)
        .send({ status: 500, message: "INTERNAL_SERVER ERROR" });
    }
  }
}

export default UserController;
