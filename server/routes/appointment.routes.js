import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createAppointment,
  getAppointmentsForDoctor,
  getAppointmentsForUser,
  updateAppointmentApproval,
  updateChatValid,
  updateReview,
} from "../controllers/appointment.controller.js";
import { validateAppointment } from "../Validation/appointmentValidation.js";
import {
  authorizedDoctor,
  authorizedPatient,
} from "../middleware/authorization.js";

const router = express.Router();

router.post("/", protectRoute, validateAppointment, createAppointment);
router.get(
  "/patient/me",
  protectRoute,
  authorizedPatient,
  getAppointmentsForUser
);
router.get(
  "/doctor/me",
  protectRoute,
  authorizedDoctor,
  getAppointmentsForDoctor
);
router.put("/approval/:id", protectRoute, updateAppointmentApproval);
router.put("/chat/:id", protectRoute, updateChatValid);
router.get("/review/:id", protectRoute, updateReview);

export default router;
