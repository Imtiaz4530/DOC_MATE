import { validationResult } from "express-validator";

import Doctor from "../models/doctor.model.js";

export const createDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, specialization, availability } = req.body;

    const doctorEmailMatched = await Doctor.findOne({ email });
    if (doctorEmailMatched) {
      return res.status(400).json({ error: "User already exist." });
    }

    const doctor = new Doctor({ name, email, specialization, availability });
    const savedDoctor = await doctor.save();

    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error("Error In Create Doctor Controller ---> ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error In Get All Doctor Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error In Get Doctor Controller ---> ", e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
