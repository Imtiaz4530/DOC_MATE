import { body } from "express-validator";
export const validateAppointment = [
  body("doctor").isString().notEmpty().withMessage("Doctor ID is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("time").isString().notEmpty().withMessage("Time is required"),
  body("reason").isString().optional(),
];
