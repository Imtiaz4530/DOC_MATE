import React from "react";
import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PropTypes from "prop-types";
import LoadingSpinner from "../Common/LoadingSpinner";

const NotificationsDropdown = ({
  anchorEl,
  open,
  handleClose,
  handleReadNotification,
  notifications,
  loading,
}) => {
  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          width: 350,
          maxHeight: 400,
          overflowY: "auto",
          mt: 1,
          borderRadius: 2,
          boxShadow: 4,
          backgroundColor: "#2a2a2a",
          color: "#f0f0f0",
        },
      }}
    >
      {loading ? (
        <LoadingSpinner message="Loading..." />
      ) : (
        <>
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ color: "#f0f0f0" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <List disablePadding>
            {notifications.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <NotificationsNoneIcon
                  sx={{
                    fontSize: 40,
                    mb: 1,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                />
                <Typography variant="body2">
                  No notifications available.
                </Typography>
              </Box>
            ) : (
              notifications.map((notification, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    onClick={() => {
                      handleReadNotification(notification._id);
                    }}
                    sx={{
                      height: "60px",
                      backgroundColor: !notification?.isRead && "#707070",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      primary={notification?.notification}
                      primaryTypographyProps={{
                        variant: "body2",
                        sx: {
                          fontSize: "0.9rem",
                          color: !notification?.isRead ? "#ffffff" : "#f0f0f0",
                        },
                      }}
                    />
                    {!notification?.isRead ? (
                      <MailOutlineIcon
                        sx={{ color: "#f0f0f0", ml: 1, fontSize: "18px" }}
                      />
                    ) : (
                      <MarkEmailReadIcon
                        sx={{ color: "#8c8c8c", ml: 1, fontSize: "18px" }}
                      />
                    )}
                  </ListItem>
                  {index < notifications.length - 1 && (
                    <Divider
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        margin: "0 16px",
                      }}
                    />
                  )}
                </React.Fragment>
              ))
            )}
          </List>
        </>
      )}
    </Popover>
  );
};

NotificationsDropdown.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      notification: PropTypes.string,
    })
  ),
  handleReadNotification: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NotificationsDropdown;
