import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useGetNotification = (isAuthenticated) => {
  const [loading, setLoading] = useState(false);
  const { setNotifications } = useStoreActions((action) => action.notification);
  const { notifications } = useStoreState((state) => state.notification);

  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/notifications`);

        const data = res.data;

        const sortedNotification = data.sort((a, b) => {
          if (a.isRead === b.isRead) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return a.isRead - b.isRead;
        });

        setNotifications(sortedNotification);
      } catch (e) {
        if (e.response) {
          const errorMessage =
            e.response.data?.message ||
            e.response.data?.error ||
            e.response.statusText ||
            "An error occurred";

          toast.error(`Errorss: ${e.response.status} - ${errorMessage}`);
          console.log(`Error: ${e.response.status} - ${errorMessage}`);
        } else if (e.request) {
          toast.error("No response from server. Please try again later.");
          console.log("No response from server. Please try again later.");
        } else {
          toast.error(`Error: ${e.message}`);
          console.log(`Error: ${e.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      getNotifications();
    }
  }, [setNotifications, isAuthenticated]);

  return {
    notifications,
    loading,
  };
};

export default useGetNotification;
