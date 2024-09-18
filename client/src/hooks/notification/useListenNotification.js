import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import notificationSound from "../../../assets/sound/notification.mp3";

const useListenNotification = () => {
  const socket = useStoreState((state) => state.socket.socket);
  const { setNotifications } = useStoreActions((action) => action.notification);
  const { notifications } = useStoreState((state) => state.notification);

  useEffect(() => {
    socket?.on("newNotification", (newNotification) => {
      newNotification.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play(sound);
      setNotifications([...notifications, newNotification]);
    });

    return () => socket?.off("newNotification");
  }, [socket, notifications, setNotifications]);
};

export default useListenNotification;
