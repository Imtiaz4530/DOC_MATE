import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useDoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");
  const [appointmentToReject, setAppointmentToReject] = useState(null);

  const { setSelectedConversation } = useStoreActions((action) => action.chat);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/appointments/doctor/me`);
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSelectedConversation = async (userInfo, id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/api/appointments/chat/${id}`);

      const data = res.data;

      if (data.message === "success") {
        setSelectedConversation(userInfo);
        localStorage.setItem("chat-user", JSON.stringify(userInfo));
        navigate("/chat", { state: { id } });
      } else {
        localStorage.removeItem("chat-user");
        navigate("/doctor/appointments");
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

  const handleAccept = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/appointments/approval/${id}`, {
        status: "confirmed",
      });
      fetchAppointments();
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
  const handleReject = async (id) => {
    setAppointmentToReject(id);
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectMessage.trim()) {
      setError("Please provide a reason for rejection.");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/appointments/approval/${appointmentToReject}`,
        {
          status: "cancelled",
          rejectMessage,
        }
      );
      setRejectModalOpen(false);
      setRejectMessage("");
      fetchAppointments();
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
    error,
    rejectModalOpen,
    handleRejectConfirm,
    handleReject,
    handleAccept,
    handleSelectedConversation,
    setRejectModalOpen,
    rejectMessage,
    setRejectMessage,
  };
};

export default useDoctorDashboard;
