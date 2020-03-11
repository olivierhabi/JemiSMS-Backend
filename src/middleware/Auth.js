import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send({ status: 401, message: "Acces denied. No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ status: 400, message: "Invalid token" });
  }
};
