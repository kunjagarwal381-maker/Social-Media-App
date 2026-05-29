import { Router } from "express";
import * as authController from "../controllers/authControllers.js";

const router = Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);

export const authRoutes = router;
