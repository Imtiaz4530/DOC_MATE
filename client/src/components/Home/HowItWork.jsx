import { Typography, Grid, Card, Box } from "@mui/material";

const HowItWork = () => {
  return (
    <Box sx={{ py: 8, textAlign: "center", mb: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            step: "1. Create an Account",
            detail: "Sign up as a patient or doctor.",
          },
          {
            step: "2. Find a Doctor",
            detail: "Browse through our list of healthcare professionals.",
          },
          {
            step: "3. Book an Appointment",
            detail: "Schedule a consultation at your convenience.",
          },
          {
            step: "4. Chat or Video Call",
            detail: "Engage in real-time communication with doctors.",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ padding: 2, boxShadow: 3, height: "88px" }}>
              <Typography variant="h6" gutterBottom>
                {item.step}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.detail}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWork;
