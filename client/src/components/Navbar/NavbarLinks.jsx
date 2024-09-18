import {
  Badge,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DoctorIcon from "@mui/icons-material/LocalHospital";
import AppointmentsIcon from "@mui/icons-material/EventAvailable";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useState } from "react";

import NotificationsDropdown from "./NotificationsDropdown";

const NavbarLinks = ({
  isAuthenticated,
  role,
  handleLogout,
  iconStyles,
  notifications,
  unreadNotifications,
  handleReadNotification,
  loading,
  pathname,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };
  const tooltipStyles = {
    fontSize: "1rem",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        ml: "auto",
      }}
    >
      {isAuthenticated ? (
        role === "patient" ? (
          <>
            <Tooltip
              title={<Typography sx={tooltipStyles}>Profile</Typography>}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 300 }}
            >
              <IconButton
                color="inherit"
                component={Link}
                to="/profile"
                sx={iconStyles}
              >
                <AccountCircleIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={<Typography sx={tooltipStyles}>Doctor List</Typography>}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 300 }}
            >
              <IconButton
                color="inherit"
                component={Link}
                to="/doctors"
                sx={iconStyles}
              >
                <DoctorIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={<Typography sx={tooltipStyles}>Appointments</Typography>}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 300 }}
            >
              <IconButton
                color="inherit"
                component={Link}
                to="/appointments"
                sx={iconStyles}
              >
                <AppointmentsIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={<Typography sx={tooltipStyles}>Notification</Typography>}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 300 }}
            >
              <IconButton
                color="inherit"
                component={Link}
                sx={iconStyles}
                onClick={handleOpenDropdown}
                disabled={pathname === "/chat"}
              >
                <Badge
                  badgeContent={unreadNotifications}
                  color="error"
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      top: 8,
                      right: 8,
                      backgroundColor: "#f50057",
                      color: "#ffffff",
                    },
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: "28px" }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <NotificationsDropdown
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleClose={handleCloseDropdown}
              notifications={notifications}
              handleReadNotification={handleReadNotification}
              loading={loading}
            />

            <Tooltip
              title={<Typography sx={tooltipStyles}>Logout</Typography>}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 300 }}
            >
              <IconButton
                color="inherit"
                sx={iconStyles}
                onClick={handleLogout}
              >
                <LogoutIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip
              title={<Typography sx={tooltipStyles}>Profile</Typography>}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 300 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="inherit"
                component={Link}
                to="/profile"
                sx={iconStyles}
              >
                <AccountCircleIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={<Typography sx={tooltipStyles}>Appointments</Typography>}
              TransitionProps={{ timeout: 300 }}
              placement="bottom"
              arrow
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="inherit"
                component={Link}
                to="/doctor/appointments"
                sx={iconStyles}
              >
                <AppointmentsIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={<Typography sx={tooltipStyles}>Notification</Typography>}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 300 }}
            >
              <IconButton
                color="inherit"
                component={Link}
                sx={iconStyles}
                onClick={handleOpenDropdown}
                disabled={pathname === "/chat"}
              >
                <Badge
                  badgeContent={unreadNotifications}
                  color="error"
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      top: 8,
                      right: 8,
                      backgroundColor: "#f50057",
                      color: "#ffffff",
                    },
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: "28px" }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <NotificationsDropdown
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleClose={handleCloseDropdown}
              notifications={notifications}
              handleReadNotification={handleReadNotification}
              loading={loading}
            />
            <Tooltip
              title={<Typography sx={tooltipStyles}>Logout</Typography>}
              TransitionProps={{ timeout: 300 }}
              placement="bottom"
              arrow
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="inherit"
                component={Link}
                sx={iconStyles}
                onClick={handleLogout}
              >
                <LogoutIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </Tooltip>
          </>
        )
      ) : (
        <>
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="/register"
            startIcon={<AppRegistrationIcon />}
          >
            Signup
          </Button>
        </>
      )}
    </Box>
  );
};

NavbarLinks.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
  notifications: PropTypes.array,
  unreadNotifications: PropTypes.number,
  handleReadNotification: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default NavbarLinks;
