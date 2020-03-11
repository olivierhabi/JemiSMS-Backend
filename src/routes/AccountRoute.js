import { Router } from "express";
import Auth from "../middleware/Auth";

const router = Router();

router.get("/", (req, res) =>
  res.send({ status: 200, message: "This is Account Dashboard" })
);

export default router;
