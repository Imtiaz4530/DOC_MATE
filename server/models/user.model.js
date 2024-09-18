import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
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
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["doctor", "patient", "admin"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
