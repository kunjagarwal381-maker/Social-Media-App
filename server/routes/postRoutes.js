import { Router } from "express";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../controllers/postControllers.js";

const router = Router();

router.route("/").post(authMiddleware, createPost);
router.route("/:id").delete(authMiddleware, deletePost);
router.route("/").get(getAllPosts);

export const postRoutes = router;
