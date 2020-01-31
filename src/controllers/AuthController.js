import bcrypt from "bcryptjs";
import "@babel/polyfill";
import token from "../helpers/gentoken";
import AuthService from "../services/AuthService";

class AuthController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user token
   */
  static async Login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.findUser(email);
      if (!user) {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid email or password" });
      }
      const validPassword = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (!validPassword) {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid password or password" });
      }
      const data = await token({
        username: user.dataValues.username,
        email: user.dataValues.email,
        phone: user.dataValues.phone
      });

      return res.status(200).send({
        status: 200,
        message: "User is successfully logged in",
        token: data
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export default AuthController;
