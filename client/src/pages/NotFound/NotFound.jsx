import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const NotFound = () => {
  const theme = useTheme();

  return (
    <PageWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(4),
          boxShadow: theme.shadows[2],
          borderRadius: theme.spacing(1),
          gap: 2,
        }}
      >
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: theme.spacing(2) }}
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
            boxShadow: theme.shadows[1],
            transition: "transform 0.4s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: theme.shadows[2],
            },
          }}
        >
          Go to Home
        </Button>
      </Box>
    </PageWrapper>
  );
};

export default NotFound;
