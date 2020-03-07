import { Router } from "express";
import BalanceController from "../controllers/BalanceController";
import BalanceValidator from "../helpers/validators/BalanceValidator";

const { validate } = BalanceValidator;

const router = Router();

router.get("/", BalanceController.GetBalance);
router.post("/add", validate, BalanceController.AddBalance);
router.post("/remove", BalanceController.RemoveBalance);

export default router;
