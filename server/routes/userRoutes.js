import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  followUser,
  getUserProfile,
  unfollowUser,
  updateUserProfile,
} from "../controllers/userControllers.js";

const router = Router();

router.route("/:id/follow").post(authMiddleware, followUser);
router.route("/:id/unfollow").post(authMiddleware, unfollowUser);

router.route("/:id").get(authMiddleware, getUserProfile);
router.route("/update").put(authMiddleware, updateUserProfile);

export const userRoute = router;
