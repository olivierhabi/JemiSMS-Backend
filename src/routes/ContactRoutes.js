import { Router } from "express";
import Auth from "../middleware/Auth";
import ContactController from "../controllers/ContactController";
import ContactValidator from "../helpers/validators/ContactValidator";

const { validate } = ContactValidator;

const router = Router();

router.post("/", Auth, validate, ContactController.AddContact);
router.get("/", Auth, ContactController.getMyContact);
router.delete("/:id", Auth, ContactController.deleteMyContact);

export default router;
