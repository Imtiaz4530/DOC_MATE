import { Box, Typography, useTheme } from "@mui/material";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import ChatMessage from "./ChatMessage";
import useGetMessages from "../../hooks/chat/useGetMessages";
import useListenMessages from "../../hooks/chat/useListenMessages";
import LoadingSpinner from "../Common/LoadingSpinner";

const ChatMessages = ({ conversation }) => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const endOfMessagesRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) return <LoadingSpinner message="Loading Messages..." />;

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        padding: 2,
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          sx={{ textAlign: "center" }}
        >
          <Typography color="textSecondary" variant="h5">
            No messages yet. Start the conversation!
          </Typography>
        </Box>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message._id}
            message={message}
            conversation={conversation}
          />
        ))
      )}
      <div ref={endOfMessagesRef} />
    </Box>
  );
};

ChatMessages.propTypes = {
  conversation: PropTypes.shape({
    profilePic: PropTypes.string,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string,
  }),
};

export default ChatMessages;
