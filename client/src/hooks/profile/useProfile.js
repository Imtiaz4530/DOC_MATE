import { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";
import useFormatDOB from "../date/useFormatDOB";

const useProfile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const authUser = useStoreState((state) => state.user.user);

  const dateOfBirth = profile.dateOfBirth || authUser.dateOfBirth;
  const dob = useFormatDOB(dateOfBirth);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/profile?id=${authUser._id}`
        );
        setProfile(response.data);
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
    fetchProfile();
  }, [authUser._id]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/api/profile/update/${authUser._id}`,
        data
      );
      setProfile(response.data);
      setEditMode(false);
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
    profile,
    editMode,
    setEditMode,
    authUser,
    dob,
    onSubmit,
    loading,
  };
};

export default useProfile;
