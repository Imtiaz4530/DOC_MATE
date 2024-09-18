import cron from "node-cron";

import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const recieverId = req.user._id;

    const notifications = await (
      await Notification.find({ recieverId }).limit(100)
    ).filter((item) => !item.isRead);

    res.status(200).json(notifications || []);
  } catch (e) {
    console.error("Error in get notification controller ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { isRead } = req.body;
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification)
      return res.status(404).json({ message: "No notification with this id." });

    notification.isRead = isRead;
    await notification.save();

    res.status(200).json(notification);
  } catch (e) {
    console.error("Error in update notification controller ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const deleteOldNotifications = async () => {
  const currentTime = new Date();
  const sevenDaysAgo = new Date(currentTime);
  sevenDaysAgo.setDate(currentTime.getDate() - 6);

  try {
    await Notification.deleteMany({
      createdAt: { $lt: sevenDaysAgo },
    });
  } catch (error) {
    console.error("Error in deleteOldNotifications --->", error.message);
  }
};

cron.schedule("*/600 * * * *", deleteOldNotifications);
