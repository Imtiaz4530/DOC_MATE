// components/Chat/ChatInput.js
import { useState, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import useSendMessage from "../../hooks/chat/useSendMessage";
import axiosInstance from "../../api/axiosInstance";

const ChatInput = ({ appointmentId }) => {
  const [message, setMessage] = useState("");
  const { loadingAttachment, loading, sendMessage, sendAttachment } =
    useSendMessage();
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/api/appointments/chat/${appointmentId}`
      );
      const data = res.data;

      if (data.message === "success") {
        if (message.trim()) {
          sendMessage(message);
          setMessage("");
        }
      } else {
        localStorage.removeItem("chat-user");
        navigate("/");
        alert("Please Reload! Your appointment is over!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    try {
      const res = await axiosInstance.put(
        `/api/appointments/chat/${appointmentId}`
      );
      const data = res.data;
      if (data.message === "success") {
        const file = e.target.files[0];

        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axiosInstance.post(
            "/api/chats/upload-file",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (res.status === 200 && res.data) {
            await sendAttachment(res.data.filePath);
            fileInputRef.current.value = "";
          }
        } else {
          localStorage.removeItem("chat-user");
          navigate("/");
          alert("Please Reload! Your appointment is over!");
        }
      }
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        alignItems="center"
        padding={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            sx: { borderRadius: theme.shape.borderRadius },
            endAdornment: (
              <>
                <IconButton onClick={handleAttachmentClick}>
                  {loadingAttachment ? (
                    <CircularProgress size={24} />
                  ) : (
                    <AttachFileIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                  )}
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <IconButton type="submit">
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <SendIcon sx={{ color: theme.palette.primary.main }} />
                  )}
                </IconButton>
              </>
            ),
          }}
        />
      </Box>
    </form>
  );
};

ChatInput.propTypes = {
  appointmentId: PropTypes.string.isRequired,
};

export default ChatInput;
