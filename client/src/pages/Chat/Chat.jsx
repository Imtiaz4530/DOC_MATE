import { Container } from "@mui/material";

import ChatHeader from "../../components/Chat/ChatHeader";
import ChatMessages from "../../components/Chat/ChatMessages";
import ChatInput from "../../components/Chat/ChatInput";
import useChat from "../../hooks/chat/useChat";

const Chat = () => {
  const { handleOnBack, location, selectedConversation } = useChat();

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", height: "90vh" }}
    >
      <ChatHeader conversation={selectedConversation} onBack={handleOnBack} />
      <ChatMessages conversation={selectedConversation} />
      <ChatInput appointmentId={location.state.id} />
    </Container>
  );
};

export default Chat;
