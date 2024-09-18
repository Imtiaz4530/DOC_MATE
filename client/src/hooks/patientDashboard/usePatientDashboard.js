import { useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const usePatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setSelectedConversation } = useStoreActions((action) => action.chat);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/api/appointments/patient/me");
        const data = res.data;

        const sortedAppointments = data.sort((a, b) => {
          const dateTimeA = new Date(
            new Date(a.date).toLocaleDateString() + " " + a.time
          );
          const dateTimeB = new Date(
            new Date(b.date).toLocaleDateString() + " " + b.time
          );

          return dateTimeB - dateTimeA;
        });

        setAppointments(sortedAppointments);
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
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleSelectedConversation = async (userInfo, id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/api/appointments/chat/${id}`, {
        recieverId: userInfo?._id,
      });

      const data = res.data;

      if (data.message === "success") {
        userInfo.profilePic = data?.profilePic;
        setSelectedConversation(userInfo);
        localStorage.setItem("chat-user", JSON.stringify(userInfo));
        navigate("/chat", { state: { id } });
      } else {
        localStorage.removeItem("chat-user");
        navigate("/appointments");
      }
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
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    appointments,
    handleSelectedConversation,
  };
};

export default usePatientDashboard;
