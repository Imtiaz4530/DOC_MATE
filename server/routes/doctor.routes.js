import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createDoctor,
  getDoctorById,
  getDoctors,
} from "../controllers/doctor.controller.js";
import { createDoctorValidation } from "../Validation/doctorValidation.js";

const router = express.Router();

router.get("/", protectRoute, getDoctors);
router.post("/", protectRoute, createDoctorValidation, createDoctor);
router.get("/:doctorId", protectRoute, getDoctorById);

export default router;
