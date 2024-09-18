import { useState } from "react";
import { Box, Avatar, Typography, IconButton, Dialog } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useStoreState } from "easy-peasy";
import { format } from "date-fns";
import PropTypes from "prop-types";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

import axiosInstance from "../../api/axiosInstance";

const ChatMessage = ({ message, conversation }) => {
  const authUser = useStoreState((state) => state.user.user);
  const fromMe = message.senderId === authUser._id;
  const theme = useTheme();

  const [openImageDialog, setOpenImageDialog] = useState(false);

  const handleFileDownload = async (url) => {
    const res = await axiosInstance.get(`/${url}`, { responseType: "blob" });

    const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  };

  const handleImageClick = () => {
    setOpenImageDialog(true);
  };

  const handleImageClose = () => {
    setOpenImageDialog(false);
  };

  const renderContent = () => {
    switch (message.messageType) {
      case "text":
        return (
          <Typography
            variant="body1"
            color={
              fromMe
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary
            }
          >
            {message.content}
          </Typography>
        );
      case "file":
        // Check if the file is an image
        if (message.fileUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
          return (
            <>
              <Box
                component="img"
                src={`http://localhost:4000/${message.fileUrl}`}
                alt="Sent Image"
                sx={{
                  maxWidth: 200,
                  maxHeight: 200,
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[3],
                  marginTop: theme.spacing(1),
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
              />
              <Dialog open={openImageDialog} onClose={handleImageClose}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Overlay icons on the image */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: theme.spacing(1),
                      right: theme.spacing(1),
                      display: "flex",
                      zIndex: 2,
                    }}
                  >
                    <IconButton
                      color="inherit"
                      onClick={() => handleFileDownload(message.fileUrl)}
                      sx={{
                        color: "#fff",
                        background: "rgba(0, 0, 0, 0.5)",
                        marginRight: theme.spacing(1),
                        "&:hover": {
                          background: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      onClick={handleImageClose}
                      sx={{
                        color: "#fff",
                        background: "rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                          background: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Box
                    component="img"
                    src={`http://localhost:4000/${message.fileUrl}`}
                    alt="Enlarged Image"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "60vh",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Dialog>
            </>
          );
        }
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.palette.background.default,
              padding: theme.spacing(1),
              borderRadius: theme.shape.borderRadius,
              marginTop: theme.spacing(1),
              boxShadow: theme.shadows[1],
            }}
          >
            <IconButton
              onClick={() => handleFileDownload(message.fileUrl)}
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <FolderZipIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                textDecoration: "underline",
                marginLeft: theme.spacing(1),
              }}
            >
              {message.fileUrl.split("/").pop()}
            </Typography>
          </Box>
        );
      default:
        return (
          <Typography variant="body1 " color={theme.palette.text.primary}>
            Unsupported message type.
          </Typography>
        );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={fromMe ? "row-reverse" : "row"}
      alignItems="center"
      marginBottom={3}
      marginTop={2}
    >
      {!fromMe && (
        <Avatar
          src={conversation.profilePic}
          alt="Sender Avatar"
          sx={{
            width: 40,
            height: 40,
            marginRight: fromMe ? 0 : theme.spacing(1),
          }}
        />
      )}
      <Box
        sx={{
          backgroundColor: fromMe
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          color: fromMe
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary,
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          boxShadow: fromMe ? theme.shadows[2] : theme.shadows[1],
          maxWidth: "75%",
          wordWrap: "break-word",
        }}
      >
        {renderContent()}
      </Box>
      <Box
        sx={{
          marginLeft: fromMe ? 0 : theme.spacing(2),
          marginRight: fromMe ? theme.spacing(3) : 0,
          marginTop: theme.spacing(0.5),
          display: "flex",
          flexDirection: fromMe ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ textAlign: fromMe ? "right" : "left" }}
        >
          {format(new Date(message.createdAt), "HH:mm")}
        </Typography>
      </Box>
    </Box>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string,
    fileUrl: PropTypes.string,
    senderId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired,
  }).isRequired,
  conversation: PropTypes.shape({
    profilePic: PropTypes.string,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string,
  }),
};

export default ChatMessage;
