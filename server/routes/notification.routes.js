import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.put("/:id", protectRoute, updateNotification);

export default router;
