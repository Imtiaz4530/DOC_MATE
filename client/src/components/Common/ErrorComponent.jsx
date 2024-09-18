import { Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const ErrorComponent = ({ errorMessage, errorCode, onRetry }) => {
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
        p: 2,
      }}
    >
      <ReportProblemIcon
        sx={{
          fontSize: 60,
          color: "secondary.main",
        }}
      />
      <Typography variant="h5" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      {errorMessage && (
        <Typography variant="body1" color="textSecondary">
          {errorMessage}
        </Typography>
      )}
      {errorCode && (
        <Typography variant="body2" color="textSecondary">
          Error Code: {errorCode}
        </Typography>
      )}
      {onRetry && (
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

ErrorComponent.propTypes = {
  errorMessage: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRetry: PropTypes.func,
};

ErrorComponent.defaultProps = {
  errorMessage: "An unexpected error occurred. Please try again.",
  errorCode: null,
  onRetry: null,
};

export default ErrorComponent;
