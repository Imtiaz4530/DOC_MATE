import { action } from "easy-peasy";

const notificationModel = {
  notifications: [],

  setNotifications: action((state, payload) => {
    state.notifications = payload;
  }),
};

export default notificationModel;
