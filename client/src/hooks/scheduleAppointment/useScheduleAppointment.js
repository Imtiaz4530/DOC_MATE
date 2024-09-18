import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const useScheduleAppointment = () => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);

  const location = useLocation();
  const navigate = useNavigate();

  const { doctorId, doctorName } = location.state || {};

  useEffect(() => {
    if (!doctorId || !doctorName) {
      navigate("/doctors");
    }
  }, [doctorId, doctorName, navigate]);

  const scheduleAppointment = async (data, history) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/appointments", {
        ...data,
        doctor: doctorId,
        rejectMessage: "",
      });
      history("/appointments", { replace: true });
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

  const validateTime = (time, selectedDate) => {
    const timeValue = parseInt(time.replace(":", ""), 10);
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const oneHourLater = currentTime + 100;

    const selectedDateObj = new Date(selectedDate);
    selectedDateObj.setHours(0, 0, 0, 0);

    now.setHours(0, 0, 0, 0);

    if (
      selectedDateObj.getTime() === now.getTime() &&
      timeValue <= oneHourLater
    ) {
      return "Please select a time at least 1 hour from now.";
    }

    if (
      (timeValue >= 1000 && timeValue <= 1300) ||
      (timeValue >= 1600 && timeValue <= 2200)
    ) {
      return true;
    }

    return "Please select a time between 10:00 AM - 1:00 PM or 4:00 PM - 10:00 PM.";
  };

  const validateDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    const selectedDate = new Date(date);
    if (selectedDate >= today && selectedDate <= maxDate) {
      return true;
    }
    return "Please select a date within the next 7 days.";
  };

  return {
    loading,
    scheduleAppointment,
    validateDate,
    validateTime,
    today,
    maxDate,
    doctorName,
  };
};

export default useScheduleAppointment;
