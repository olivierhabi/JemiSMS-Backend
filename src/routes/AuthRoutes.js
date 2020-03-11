import { Router } from "express";
import AuthController from "../controllers/AuthController";
import SigninValidator from "../helpers/validators/SigninValidator";

const { validate } = SigninValidator;

const router = Router();

router.post("/signin/", validate, AuthController.Login);

export default router;
