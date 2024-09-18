import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Simple email format validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please provide a valid email address.",
    },
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  availability: {
    type: [String],
    required: true,
    validate: {
      validator: (array) => array.length > 0,
      message: "Availability must include at least one day.",
    },
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
