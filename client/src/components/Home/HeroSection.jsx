import { Typography, Grid, Box } from "@mui/material";

import { COLORS } from "../../theme";
import HeroImage from "/HeroSection.jpg";

const HeroSection = () => {
  return (
    <Box
      sx={{
        px: 10,
        py: 8,
        backgroundColor: COLORS.cardBackground,
        mb: 6,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={HeroImage}
            alt="Hero"
            style={{ width: "75%", borderRadius: "4px" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Docmate
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Your personal medical consultancy platform. Schedule appointments,
            chat with doctors, and manage your health records effortlessly.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            At Docmate, we prioritize your health by providing an easy-to-use
            platform where you can connect with medical professionals in
            real-time. Experience healthcare access like never before, all from
            the comfort of your home.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
