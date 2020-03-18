import { Router } from "express";
import ScheduleController from "../controllers/ScheduleController";
import Auth from "../middleware/Auth";

const router = Router();

router.post("/", Auth, ScheduleController.AddSchedule);
router.get("/", Auth, ScheduleController.getSchedule);

export default router;
