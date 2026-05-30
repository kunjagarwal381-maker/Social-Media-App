import { Router } from "express";
import * as authController from "../controllers/authControllers.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/valiDateUser.js";

const router = Router();

router.route("/register").post(validateRegister, authController.registerUser);
router.route("/login").post(validateLogin, authController.loginUser);

export const authRoutes = router;
