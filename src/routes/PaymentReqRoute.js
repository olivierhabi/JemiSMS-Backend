import { Router } from "express";
import PaymentReqController from "../controllers/PaymentReqController";
import PaymentValidator from "../helpers/validators/PaymentValidator";

const { validate } = PaymentValidator;

const router = Router();

router.post("/", validate, PaymentReqController.ReqPayment);

export default router;
