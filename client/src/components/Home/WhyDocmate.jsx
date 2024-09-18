import { Typography, Grid, Card, Box } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const WhyDocmate = () => {
  return (
    <Box sx={{ py: 8, mb: 6 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Why Choose Docmate?
      </Typography>
      <Grid container spacing={4}>
        {[
          {
            title: "Trusted Doctors",
            description:
              "All doctors are verified and come with extensive experience in their fields.",
            icon: <VerifiedUserIcon fontSize="large" color="primary" />,
          },
          {
            title: "Secure & Private",
            description:
              "Your data is encrypted and protected with industry-leading security standards.",
            icon: <SecurityIcon fontSize="large" color="secondary" />,
          },
          {
            title: "Accessible Anywhere",
            description:
              "Access healthcare services from the comfort of your home, anytime.",
            icon: <LocalHospitalIcon fontSize="large" color="primary" />,
          },
        ].map((benefit, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ padding: 2, boxShadow: 3 }}>
              {benefit.icon}
              <Typography variant="h5" gutterBottom>
                {benefit.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {benefit.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyDocmate;
