import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import validator from "validator";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      name,
      username,
      email,
      password,
      confirmPassword,
      role,
      gender,
      dateOfBirth,
      phone,
    } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    const emailDomain = email.split("@")[1];

    if (!allowedDomains.includes(emailDomain)) {
      return res.status(400).json({
        error: `Email domain must be one of: ${allowedDomains.join(", ")}.`,
      });
    }

    if (role === "admin") {
      return res.status(400).json({ error: "Your role must be patient." });
    }

    if (role === "doctor") {
      return res.status(400).json({ error: "Your role must be patient." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match." });
    }

    const user = await User.findOne({ email });
    const usernameMatch = await User.findOne({ username });
    const phoneMatch = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ error: "User already exist." });
    }
    if (usernameMatch) {
      return res.status(400).json({ error: "Change your username!" });
    }
    if (phoneMatch) {
      return res.status(400).json({ error: "Change your phone number!" });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Generating Profile Picture
    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      name,
      username,
      email,
      password: hashPassword,
      phone,
      role,
      gender,
      dateOfBirth,
      profilePic,
    });

    if (newUser) {
      await newUser.save();

      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        gender: newUser.gender,
        dateOfBirth: newUser.dateOfBirth,
        profilePic: newUser.profilePic,
      });
    }
  } catch (e) {
    console.log("Error In Signup Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Wrong Password!" });
    }

    //Token create
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      profilePic: user.profilePic,
    });
  } catch (e) {
    console.log("Error In login Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    console.log("Error In Logout Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
