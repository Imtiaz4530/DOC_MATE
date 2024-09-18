import { Box, Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const PendingButton = ({ handleAccept, handleReject }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: theme.spacing(2), mt: 2 }}>
      <Button
        variant="contained"
        color="success"
        onClick={handleAccept}
        sx={{ flexGrow: 1 }}
      >
        Accept
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleReject}
        sx={{ flexGrow: 1 }}
      >
        Reject
      </Button>
    </Box>
  );
};

PendingButton.propTypes = {
  handleAccept: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired,
};

export default PendingButton;
