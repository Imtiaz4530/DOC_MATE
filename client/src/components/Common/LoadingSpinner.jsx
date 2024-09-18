import { CircularProgress, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const LoadingSpinner = ({ message = "Loading, please wait..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        gap: 2,
        color: "text.primary",
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: "primary.main",
        }}
      />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
