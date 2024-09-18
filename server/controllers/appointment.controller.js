import { validationResult } from "express-validator";
import cron from "node-cron";

import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import { availableDayCheck } from "../utils/extractDate.js";
import { getReceiverId, io } from "../socket/socket.js";
import Notification from "../models/notification.model.js";

export const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const patient = req.user?._id;

    const { doctor, date, time, reason, rejectMessage } = req.body;
    const day = availableDayCheck(date);
    // Check if the doctor exists
    const existingDoctor = await Doctor.findById(doctor);
    if (!existingDoctor)
      return res.status(404).json({ message: "Doctor not found" });

    const isDoctorAvailableDay = existingDoctor.availability.includes(day);

    if (!isDoctorAvailableDay) {
      return res.status(404).json({
        message:
          "This doctor not available on this day, Please Check doctors available days. ",
      });
    }

    const doctorId = await User.findOne({ email: existingDoctor.email });

    const existingAppointments = await Appointment.find({ patient });

    if (existingAppointments.length > 0) {
      const alreadyPendingAppointment = existingAppointments.filter(
        (item) => item.status === "pending" || item.status === "confirmed"
      );

      if (alreadyPendingAppointment.length > 0) {
        return res.status(404).json({
          message: "You already have an appointment, let's finish it first!",
        });
      }
    }

    const appointment = new Appointment({
      patient,
      doctor: doctorId._id,
      date,
      time,
      reason,
      rejectMessage,
    });

    const createdAppointment = await appointment.save();

    if (createAppointment) {
      const newNotification = new Notification({
        recieverId: doctorId,
        notification: "A new appointment request from patient.",
        type: "request",
      });

      const createdNotification = await newNotification.save();

      const receiverSocketId = getReceiverId(doctorId._id);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", createdNotification);
      }
    }

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: createdAppointment,
    });
  } catch (error) {
    console.error(
      "Error in Create Appointment Controller ---> ",
      error.message
    );
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getAppointmentsForUser = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    const appointments = await Appointment.find({ patient: userId })
      .populate("doctor", "name")
      .sort({ date: -1, time: -1 })
      .limit(10);

    res.status(200).json(appointments || []);
  } catch (error) {
    console.error(
      "Error in Get Appointments For User Controller ---> ",
      error.message
    );
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getAppointmentsForDoctor = async (req, res) => {
  try {
    const id = req.user?._id;
    if (!id) {
      return res.status(400).json({ error: "Doctor ID is missing" });
    }

    const findDoctor = await User.findById(id);
    if (!findDoctor) {
      return res.status(400).json({ error: "User not found." });
    }

    const appointments = await Appointment.find({
      doctor: id,
    })
      .populate("patient", "name")
      .sort({ date: -1, time: -1 })
      .limit(10);

    res.status(200).json(appointments || []);
  } catch (error) {
    console.error(
      "Error in Get Appointments For Doctor Controller ---> ",
      error.message
    );
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const updateAppointmentApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectMessage } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "No appointment found!" });
    }

    if (appointment.status === "cancelled") {
      return res
        .status(404)
        .json({ message: "This is an overdue appointment! Please reload!" });
    }

    appointment.status = status;
    appointment.rejectMessage = rejectMessage || appointment.rejectMessage;

    const updatedAppointment = await appointment.save();

    if (updatedAppointment) {
      let newNotification;

      if (updatedAppointment.status === "confirmed") {
        newNotification = new Notification({
          recieverId: updatedAppointment.patient,
          notification: "Your request for appointment is accepted.",
          type: "accept",
        });
      } else {
        newNotification = new Notification({
          recieverId: updatedAppointment.patient,
          notification: "Your request for appointment is cancelled.",
          type: "cancel",
        });
      }

      const createdNotification = await newNotification.save();

      const receiverSocketId = getReceiverId(updatedAppointment.patient);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", createdNotification);
      }
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error(
      "Error in Update Appointment Approval Controller ---> ",
      error.message
    );
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const updateChatValid = async (req, res) => {
  try {
    const { id } = req.params;
    const { recieverId } = req.body;

    const appointment = await Appointment.findById(id).select("isChat -_id");
    if (!appointment) {
      return res.status(404).json({ message: "No appointment found!" });
    }

    if (!appointment.isChat) {
      return res.status(200).json({ message: "reload" });
    }

    if (recieverId) {
      const reciever = await User.findById(recieverId).select(
        "profilePic -_id"
      );

      return res
        .status(200)
        .json({ message: "success", profilePic: reciever.profilePic });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error in update Chat Valid Controller ---> ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "No appointment found!" });
    }

    appointment.isReview = false;
    await appointment.save({ validateBeforeSave: false });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error in update Review Controller ---> ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

const appointmentAlertForDoctorAndPatient = async () => {
  const currentTime = new Date();
  const currentDateStr =
    currentTime.getFullYear() +
    "-" +
    String(currentTime.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentTime.getDate()).padStart(2, "0");
  const currentTimeStr = currentTime.toTimeString().split(" ")[0];

  const upcomingAppointments = await Appointment.find({
    status: "confirmed",
    date: { $eq: currentDateStr },
    time: {
      $gte: currentTimeStr,
      $lt: new Date(currentTime.getTime() + 30 * 60000)
        .toTimeString()
        .split(" ")[0],
    },
  });

  upcomingAppointments.forEach(async (appointment) => {
    const patientName = await User.findById(appointment.patient).select("name");
    const doctorName = await User.findById(appointment.doctor).select("name");
    // Send notification to the patient
    const newNotificationForPatient = new Notification({
      recieverId: appointment.patient,
      notification: `You have an appointment in 30 minute with ${doctorName.name}`,
      type: "alert30",
    });
    const createdNotificationForPatient =
      await newNotificationForPatient.save();

    const receiverSocketIdPatient = getReceiverId(appointment.patient);
    if (receiverSocketIdPatient) {
      io.to(receiverSocketIdPatient).emit(
        "newNotification",
        createdNotificationForPatient
      );
    }

    // Send notification to the doctor
    const newNotification = new Notification({
      recieverId: appointment.doctor,
      notification: `You have an appointment in 30 minute with ${patientName.name}`,
      type: "alert30",
    });
    const createdNotification = await newNotification.save();

    const receiverSocketIdDoctor = getReceiverId(appointment.doctor);
    if (receiverSocketIdDoctor) {
      io.to(receiverSocketIdDoctor).emit(
        "newNotification",
        createdNotification
      );
    }
  });
};

const checkAndCompleteSuccessfulAppointments = async () => {
  const currentTime = new Date();

  const currentDateStr =
    currentTime.getFullYear() +
    "-" +
    String(currentTime.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentTime.getDate()).padStart(2, "0");

  const successfulAppointments = await Appointment.find({
    status: "confirmed",
    $or: [
      { date: { $lt: currentDateStr } },
      {
        date: { $eq: currentDateStr },
        time: {
          $lt: new Date(currentTime.getTime() - 30 * 60000)
            .toTimeString()
            .split(" ")[0],
        },
      },
    ],
  });

  successfulAppointments.forEach(async (appointment) => {
    appointment.isReview = true;
    appointment.isChat = false;
    appointment.status = "completed";
    await appointment.save({ validateBeforeSave: false });

    const newNotification = new Notification({
      recieverId: appointment.patient,
      notification: "Your appointment has been successfully completed.",
      type: "complete",
    });
    const createdNotification = await newNotification.save();

    const receiverSocketId = getReceiverId(appointment.patient);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", createdNotification);
    }
  });
};

//   const currentTime = new Date();
//   const currentDateStr =
//     currentTime.getFullYear() +
//     "-" +
//     String(currentTime.getMonth() + 1).padStart(2, "0") +
//     "-" +
//     String(currentTime.getDate()).padStart(2, "0");
//   const currentTimeStr = currentTime.toTimeString().split(" ")[0];

//   const [hour, min] = currentTimeStr.split(":");

//   const successfulAppointments = await Appointment.find({
//     status: "confirmed",
//   });

//   console.log(successfulAppointments);
//   console.log(currentDateStr);
//   console.log(hour, ":", min);
//   successfulAppointments.forEach(async (appointment) => {
//     console.log(appointment.date.toISOString().split("T")[0]);
//     console.log(appointment.time);
//   });
// };

const checkAndRejectOverdueAppointments = async () => {
  const currentTime = new Date();
  const currentDateStr =
    currentTime.getFullYear() +
    "-" +
    String(currentTime.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentTime.getDate()).padStart(2, "0");
  const currentTimeStr = currentTime.toTimeString().split(" ")[0];

  const overdueAppointments = await Appointment.find({
    status: "pending",
    $or: [
      { date: { $lt: currentDateStr } },
      { date: { $eq: currentDateStr }, time: { $lt: currentTimeStr } },
    ],
  });

  overdueAppointments.forEach(async (appointment) => {
    appointment.status = "cancelled";
    appointment.rejectMessage = "Automatically rejected due to overdue time.";
    await appointment.save({ validateBeforeSave: false });

    const newNotification = new Notification({
      recieverId: appointment.patient,
      notification: "Your request for appointment is cancelled.",
      type: "cancel",
    });
    const createdNotification = await newNotification.save();
    const receiverSocketId = getReceiverId(appointment.patient);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", createdNotification);
    }
  });
};

const handleScheduledTasks = async () => {
  await checkAndRejectOverdueAppointments();
  await checkAndCompleteSuccessfulAppointments();
  await appointmentAlertForDoctorAndPatient();
};

cron.schedule("*/10 * * * *", handleScheduledTasks);
