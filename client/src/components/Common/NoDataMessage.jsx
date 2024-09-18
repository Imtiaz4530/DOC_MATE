import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const NoDataMessage = ({ message }) => {
  return (
    <Typography
      variant="body1"
      color="textSecondary"
      sx={{ my: "100px", textAlign: "center" }}
    >
      {message}
    </Typography>
  );
};

NoDataMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoDataMessage;
