import { Typography, Box } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

const Security = () => {
  return (
    <Box sx={{ py: 8, textAlign: "center", mb: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Security, Our Priority
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <SecurityIcon color="primary" sx={{ fontSize: 60, marginBottom: 2 }} />
        <Typography variant="body1" color="textSecondary" paragraph>
          Docmate ensures all your consultations and medical data are securely
          managed with industry-leading security standards.
        </Typography>
      </Box>
    </Box>
  );
};

export default Security;
