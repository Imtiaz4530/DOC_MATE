import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

import axiosInstance from "../../api/axiosInstance";

const useLogout = () => {
  const { clearUser } = useStoreActions((actions) => actions.user);
  const { socket } = useStoreState((state) => state.socket);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");

      localStorage.removeItem("user");
      localStorage.removeItem("chat-user");
      clearUser();

      if (socket) {
        socket.disconnect();
      }

      navigate("/login");
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

  return { logout };
};

export default useLogout;
