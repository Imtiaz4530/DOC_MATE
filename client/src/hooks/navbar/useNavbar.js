import { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import useGetNotification from "../notification/useGetNotification";
import axiosInstance from "../../api/axiosInstance";

const useNavbar = (isAuthenticated) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const { setNotifications } = useStoreActions((action) => action.notification);
  const { notifications, loading } = useGetNotification(isAuthenticated);
  const { pathname } = useLocation();

  useEffect(() => {
    setUnreadNotifications(
      notifications.filter((notification) => !notification.isRead).length
    );
  }, [notifications]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReadNotification = async (id) => {
    try {
      const res = await axiosInstance.put(`/api/notifications/${id}`, {
        isRead: true,
      });
      const data = res.data;
      const newNotification = notifications.filter((item) => item._id !== id);

      setNotifications([...newNotification, data]);
    } catch (e) {
      if (e.response) {
        const errorMessage =
          e.response.data?.message ||
          e.response.data?.error ||
          e.response.statusText ||
          "An error occurred";

        toast.error(`Error: ${e.response.status} - ${errorMessage}`);
        console.log(`Error: ${e.response.status} - ${errorMessage}`);
      } else if (e.request) {
        toast.error("No response from server. Please try again later.");
        console.log("No response from server. Please try again later.");
      } else {
        toast.error(`Error: ${e.message}`);
        console.log(`Error: ${e.message}`);
      }
    }
  };

  return {
    handleMenuClose,
    handleMenuOpen,
    handleReadNotification,
    anchorEl,
    unreadNotifications,
    loading,
    open,
    notifications,
    pathname,
  };
};

export default useNavbar;
