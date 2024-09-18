import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Appointment date must be today or in the future.",
      },
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Invalid time format, should be HH:MM.",
      },
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    rejectMessage: {
      type: String,
      maxLength: 80,
    },
    isChat: {
      type: Boolean,
      default: true,
    },
    isReview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
