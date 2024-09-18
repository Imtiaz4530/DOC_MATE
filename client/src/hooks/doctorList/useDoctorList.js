import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/doctors");
        setDoctors(response.data);
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

    fetchDoctors();
  }, []);

  const handleSelectDoctor = (doctor) => {
    navigate("/appointments/book", {
      state: { doctorId: doctor._id, doctorName: doctor.name },
    });
  };

  return {
    doctors,
    loading,
    handleSelectDoctor,
  };
};

export default useDoctorList;
