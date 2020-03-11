import { Router } from "express";
import BalanceController from "../controllers/BalanceController";
import BalanceValidator from "../helpers/validators/BalanceValidator";
import Auth from "../middleware/Auth";

const { validate } = BalanceValidator;

const router = Router();

router.get("/", Auth, BalanceController.GetBalance);
router.post("/add", Auth, validate, BalanceController.AddBalance);
router.post("/remove", Auth, BalanceController.RemoveBalance);

export default router;
