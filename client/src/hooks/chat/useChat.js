import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useChat = () => {
  const { setSelectedConversation } = useStoreActions((action) => action.chat);
  const { user } = useStoreState((state) => state.user);
  const { selectedConversation } = useStoreState((state) => state.chat);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedConversation = JSON.parse(localStorage.getItem("chat-user"));
    if (storedConversation) {
      setSelectedConversation(storedConversation);
    } else {
      if (user?.role === "patient") {
        navigate("/appointments");
      } else {
        navigate("/doctor/appointments");
      }
    }

    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation, navigate, user?.role]);

  const handleOnBack = () => {
    if (user?.role === "patient") {
      navigate("/appointments");
    } else {
      navigate("/doctor/appointments");
    }
  };

  return {
    handleOnBack,
    selectedConversation,
    location,
  };
};

export default useChat;
