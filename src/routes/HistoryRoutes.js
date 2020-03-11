import { Router } from "express";
import HistoryController from "../controllers/HistoryController";
import Auth from "../middleware/Auth";

const router = Router();

router.get("/", Auth, HistoryController.GetHistory);
export default router;
