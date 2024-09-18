import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    notification: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ receiverId: 1, isRead: 1 });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
