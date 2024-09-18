import PropTypes from "prop-types";
import { Component } from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };
  handleGoHome = () => {
    window.location.replace("/");
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
            backgroundColor: "background.paper",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            gap: 2,
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 60,
              color: "error.main",
            }}
          />
          <Typography variant="h4" color="primary" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please try again later or contact support.
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleReload}
              sx={{
                paddingX: 3,
                paddingY: 1.5,
                marginTop: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 4,
                },
              }}
            >
              Reload Page
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleGoHome}
              sx={{
                paddingX: 3,
                paddingY: 1.5,
                marginTop: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 4,
                },
              }}
            >
              Go Home
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
