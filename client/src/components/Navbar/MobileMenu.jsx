import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, IconButton, MenuItem, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoctorIcon from "@mui/icons-material/LocalHospital";
import AppointmentsIcon from "@mui/icons-material/EventAvailable";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import NotificationsDropdown from "./NotificationsDropdown";
import { COLORS } from "../../theme";

const MobileMenu = ({
  anchorEl,
  open,
  handleMenuOpen,
  handleMenuClose,
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
  const [anchorElNotification, setAnchorElNotification] = useState(null);

  const handleOpenDropdown = (e) => {
    setAnchorElNotification(e.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorElNotification(null);
  };
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
      >
        <MenuIcon sx={{ color: COLORS.background, fontSize: "28px" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {isAuthenticated ? (
          role === "patient" ? (
            <>
              <IconButton
                color="inherit"
                component={Link}
                to="/profile"
                sx={iconStyles}
              >
                <AccountCircleIcon sx={{ fontSize: "28px" }} />
              </IconButton>

              <IconButton
                color="inherit"
                component={Link}
                to="/doctors"
                sx={iconStyles}
              >
                <DoctorIcon sx={{ fontSize: "28px" }} />
              </IconButton>

              <IconButton
                color="inherit"
                component={Link}
                to="/appointments"
                sx={iconStyles}
              >
                <AppointmentsIcon sx={{ fontSize: "28px" }} />
              </IconButton>

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
              <NotificationsDropdown
                anchorEl={anchorElNotification}
                open={Boolean(anchorElNotification)}
                handleClose={handleCloseDropdown}
                notifications={notifications}
                handleReadNotification={handleReadNotification}
                loading={loading}
              />

              <IconButton
                color="inherit"
                component={Link}
                onClick={handleLogout}
                sx={iconStyles}
              >
                <LogoutIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                color="inherit"
                component={Link}
                to="/profile"
                sx={iconStyles}
              >
                <AccountCircleIcon sx={{ fontSize: "28px" }} />
              </IconButton>

              <IconButton
                color="inherit"
                component={Link}
                to="/doctor/appointments"
                sx={iconStyles}
              >
                <AppointmentsIcon sx={{ fontSize: "28px" }} />
              </IconButton>

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
              <NotificationsDropdown
                anchorEl={anchorElNotification}
                open={Boolean(anchorElNotification)}
                handleClose={handleCloseDropdown}
                notifications={notifications}
                handleReadNotification={handleReadNotification}
                loading={loading}
              />

              <IconButton
                color="inherit"
                component={Link}
                onClick={handleLogout}
                sx={iconStyles}
              >
                <LogoutIcon sx={{ fontSize: "28px" }} />
              </IconButton>
            </>
          )
        ) : (
          <>
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              <LoginIcon sx={{ mr: 1 }} />
              Login
            </MenuItem>
            <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
              <AppRegistrationIcon sx={{ mr: 1 }} />
              Signup
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

MobileMenu.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
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

export default MobileMenu;
