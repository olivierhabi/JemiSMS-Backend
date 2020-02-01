import { Router } from "express";
import Auth from "../middleware/Auth";

const router = Router();

router.get("/", (req, res) =>
  res.send({ status: 400, message: "Invalid password or password" })
);

export default router;
