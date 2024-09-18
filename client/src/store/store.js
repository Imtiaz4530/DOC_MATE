import { createStore } from "easy-peasy";

import userModel from "./models/userModel";
import chatModel from "./models/chatModel";
import socketModel from "./models/socketModel";
import notificationModel from "./models/notificationModel";

const store = createStore({
  user: userModel,
  chat: chatModel,
  socket: socketModel,
  notification: notificationModel,
});

export default store;
