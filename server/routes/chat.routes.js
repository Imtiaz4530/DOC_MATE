import express from "express";
import multer from "multer";

import {
  getMessages,
  sendMessage,
  uploadFile,
} from "../controllers/chat.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

const upload = multer({ dest: "server/uploads/files" });

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/upload-file", upload.single("file"), protectRoute, uploadFile);

export default router;
