import { Router } from "express";
import UserController from "../controllers/UserController";
import ValidateUser from "../helpers/validators/SignupValidator";
import validateUser from "../helpers/validators/SignupValidator";

const { validate } = validateUser;

const router = Router();

router.post("/", validate, UserController.AddUser);

export default router;
