import { Typography, Grid, Box } from "@mui/material";
import ElderlyIcon from "@mui/icons-material/PersonAddDisabled";

import { COLORS } from "../../theme";
import ElderImg from "/elder.jpg";

const Elder = () => {
  return (
    <Box sx={{ px: 10, py: 8, backgroundColor: COLORS.cardBackground, mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Empowering Seniors with Easy Online Checkups
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ElderlyIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
            <Typography variant="h5" component="h3">
              Accessible Healthcare for Everyone
            </Typography>
          </Box>
          <Typography variant="body1" color="textSecondary" paragraph>
            Docmate makes it easier for seniors to manage their health from the
            comfort of their homes. With user-friendly features, our platform is
            designed to be intuitive and accessible, ensuring that older adults
            can book appointments, consult with doctors, and access their
            medical records with ease.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Whether it's scheduling a checkup or discussing symptoms, Docmate
            provides a safe and convenient way for seniors to stay connected
            with healthcare professionals without the need to travel.
          </Typography>
        </Grid>
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
            src={ElderImg}
            alt="Senior Care"
            style={{ width: "75%", borderRadius: "4px" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Elder;
