import { body } from "express-validator";
export const validateRegister = [
  await body("name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
  await body("username")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Username is required"),
  await body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is required"),
  await body("password")
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password is required"),
  await body("confirmPassword")
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Confirm Password is required"),
  await body("role")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Role is required"),
  await body("gender")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Gender is required"),
  await body("dateOfBirth").isDate().withMessage("Date of birth is required"),
  await body("phone").isMobilePhone().withMessage("Phone number is required"),
];

export const validateLogin = [
  await body("identifier").isString().withMessage("Identifier is required"),
  await body("password").isString().withMessage("Password is required"),
];
