import { Router } from "express";
import Auth from "../middleware/Auth";
import MessageController from "../controllers/MessageController";
import MessageValidator from "../helpers/validators/MessageValidator";

const { validate } = MessageValidator;

const router = Router();

router.post("/", Auth, validate, MessageController.AddMessage);
router.get("/", Auth, MessageController.getMyMessage);

export default router;
