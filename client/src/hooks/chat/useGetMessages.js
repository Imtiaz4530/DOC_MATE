import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages } = useStoreActions((action) => action.chat);
  const { selectedConversation, messages } = useStoreState(
    (state) => state.chat
  );
  const { setSelectedConversation } = useStoreActions((action) => action.chat);

  useEffect(() => {
    const storedConversation = JSON.parse(localStorage.getItem("chat-user"));
    if (storedConversation) {
      setSelectedConversation(storedConversation.value);
    }
  }, [setSelectedConversation]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/chats/${selectedConversation?._id}`
        );

        const data = res.data;
        setMessages(data);
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

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return {
    messages,
    loading,
  };
};

export default useGetMessages;
