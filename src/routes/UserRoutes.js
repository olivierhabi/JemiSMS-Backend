import { Router } from "express";
import UserController from "../controllers/UserController";
import validateUser from "../helpers/validators/SignupValidator";
import UserUpdateValidator from "../helpers/validators/UserUpdateValidator";
import Auth from "../middleware/Auth";

const { validate } = validateUser;
const { validateUpdate } = UserUpdateValidator;

const router = Router();

router.post("/", validate, UserController.AddUser);
router.post("/update", Auth, validateUpdate, UserController.UpdateMyAccount);
router.get("/", Auth, UserController.GetUser);

export default router;
