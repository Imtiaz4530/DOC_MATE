import express from "express";
import {
  getUserProfile,
  updateProfileController,
  getAllDoctors,
} from "../controllers/profile.controller.js";
import protectedRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectedRoute, getUserProfile);
router.put("/update/:id", protectedRoute, updateProfileController);
router.get("/doctors", protectedRoute, getAllDoctors);

export default router;
