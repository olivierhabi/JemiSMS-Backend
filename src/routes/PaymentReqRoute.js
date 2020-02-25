import { Router } from "express";
import PaymentReqController from "../controllers/PaymentReqController";

const router = Router();

router.post("/", PaymentReqController.ReqPayment);

export default router;
