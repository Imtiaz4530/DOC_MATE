import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "/logo.png";
import { COLORS } from "../../theme";

const NavbarLogo = ({ theme }) => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        textDecoration: "none",
        gap: theme.spacing(2),
      }}
    >
      <img
        src={logo}
        alt="Docmate Logo"
        style={{ width: 45, height: 45, marginRight: theme.spacing(1) }}
      />
      <Typography
        variant="h6"
        sx={{
          color: COLORS.background,
          textDecoration: "none",
          letterSpacing: theme.spacing(1),
          fontWeight: 600,
        }}
      >
        DOCMATE
      </Typography>
    </Box>
  );
};

NavbarLogo.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default NavbarLogo;
