import { Router } from "express";
import PaymentReqController from "../controllers/PaymentReqController";

const router = Router();

router.post("/", PaymentReqController.ReqPayment);
router.post("/res", PaymentReqController.ReqResponse);
router.post("/test", PaymentReqController.ReqTest);

export default router;
