import Conversation from "../models/chat.model.js";
import Message from "../models/message.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { getReceiverId, io } from "../socket/socket.js";
import { mkdirSync, renameSync } from "fs";

export const sendMessage = async (req, res) => {
  try {
    const message = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const sender = await User.findById(senderId);

    let conversation = await Conversation.findOne({
      percipants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        percipants: [senderId, receiverId],
      });
    }

    let newMessage;
    if (message.messageType === "file") {
      newMessage = new Message({
        senderId,
        receiverId,
        messageType: message.messageType,
        fileUrl: message.fileUrl,
      });
    } else {
      newMessage = new Message({
        senderId,
        receiverId,
        messageType: message.messageType,
        content: message.content,
      });
    }

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // Socket.IO functionality for message
    const receiverSocketId = getReceiverId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Socket.IO functionality for notification
    const newNotification = new Notification({
      recieverId: receiverId,
      notification: `You have a new message from ${sender.name}`,
      type: "message",
    });
    const createdNotification = await newNotification.save();
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newNotification", createdNotification);
    }

    res.status(201).json(newMessage);
  } catch (e) {
    console.log("Error in sendMessage controller ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatWith } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      percipants: { $all: [senderId, userToChatWith] },
    }).populate("messages"); // Not ref but actual messages

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (e) {
    console.log("Error in get message controller ---> ", e.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required!");
    }

    const date = Date.now();
    const fileDir = `server/uploads/files/${date}`;
    const fileName = `${fileDir}/${req.file.originalname}`;

    mkdirSync(fileDir, { recursive: true });

    renameSync(req.file.path, fileName);

    return res.status(200).json({ filePath: fileName });
  } catch (e) {
    console.log("uploadFile ---->", { e });
    return res.status(500).send("Internal Server Error! uploadFile");
  }
};
