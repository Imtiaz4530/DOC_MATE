import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingAttachment, setLoadingAttachment] = useState(false);
  const { setMessages } = useStoreActions((action) => action.chat);
  const { messages, selectedConversation } = useStoreState(
    (state) => state.chat
  );

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/api/chats/send/${selectedConversation._id}`,
        { content: message, messageType: "text", fileUrl: undefined }
      );
      const data = res.data;

      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
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

  const sendAttachment = async (filePath) => {
    setLoadingAttachment(true);
    try {
      const res = await axiosInstance.post(
        `/api/chats/send/${selectedConversation._id}`,
        { content: undefined, messageType: "file", fileUrl: filePath }
      );
      const data = res.data;

      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
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
      setLoadingAttachment(false);
    }
  };

  return { sendMessage, sendAttachment, loading, loadingAttachment };
};
export default useSendMessage;
