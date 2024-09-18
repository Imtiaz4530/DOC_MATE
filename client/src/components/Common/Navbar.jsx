import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NavbarLogo from "../Navbar/NavbarLogo";
import NavbarLinks from "../Navbar/NavbarLinks";
import MobileMenu from "../Navbar/MobileMenu";
import { COLORS } from "../../theme";
import useListenNotification from "../../hooks/notification/useListenNotification";
import useLogout from "../../hooks/auth/useLogout";
import useNavbar from "../../hooks/navbar/useNavbar";

const Navbar = ({ isAuthenticated, role }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logout } = useLogout();

  useListenNotification();
  const {
    anchorEl,
    handleMenuClose,
    handleMenuOpen,
    handleReadNotification,
    loading,
    open,
    unreadNotifications,
    notifications,
    pathname,
  } = useNavbar(isAuthenticated);

  const iconStyles = {
    fontSize: "28px",
    transition: "transform 0.5s ease, color 0.5s ease",
    "&:hover": {
      color: COLORS.secondary,
      transform: "scale(1.1)",
    },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: COLORS.primary }}>
      <Container maxWidth="lg">
        <Toolbar>
          <NavbarLogo theme={theme} />
          {!isMobile ? (
            <NavbarLinks
              isAuthenticated={isAuthenticated}
              role={role}
              handleLogout={logout}
              iconStyles={iconStyles}
              notifications={notifications}
              unreadNotifications={unreadNotifications}
              handleReadNotification={handleReadNotification}
              loading={loading}
              pathname={pathname}
            />
          ) : (
            <MobileMenu
              anchorEl={anchorEl}
              open={open}
              handleMenuOpen={handleMenuOpen}
              handleMenuClose={handleMenuClose}
              isAuthenticated={isAuthenticated}
              role={role}
              handleLogout={logout}
              iconStyles={iconStyles}
              loading={loading}
              notifications={notifications}
              unreadNotifications={unreadNotifications}
              handleReadNotification={handleReadNotification}
              pathname={pathname}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

export default Navbar;
