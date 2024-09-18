import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongodbConnection from "./db/mongoConnection.js";
import { app, server } from "./socket/socket.js";
import path from "path";
dotenv.config();

//Routers
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import chatRouter from "./routes/chat.routes.js";
import userRouter from "./routes/user.routes.js";
import notificationRouter from "./routes/notification.routes.js";

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://docauth.onrender.com",
    credentials: true,
  })
);

app.use("/server/uploads/files", express.static("server/uploads/files"));

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/chats", chatRouter);
app.use("/api/users", userRouter);
app.use("/api/notifications", notificationRouter);
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
    error: "The requested resource could not be found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  mongodbConnection();
  console.log(`The app is running on http://localhost:${PORT}`);
});
