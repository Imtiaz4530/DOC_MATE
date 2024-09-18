import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatIcon from "@mui/icons-material/Chat";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const KeyFeatures = () => {
  return (
    <Box sx={{ py: 8, mb: 6 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Key Features
      </Typography>
      <Grid container spacing={4}>
        {[
          {
            title: "Appointment Scheduling",
            description:
              "Book appointments with your preferred doctor at your convenience.",
            icon: <CalendarTodayIcon fontSize="large" color="primary" />,
          },
          {
            title: "Real-Time Chat",
            description:
              "Consult with healthcare professionals directly through secure chat.",
            icon: <ChatIcon fontSize="large" color="secondary" />,
          },
          {
            title: "Video Consultations",
            description:
              "Experience real-time video consultations with doctors.",
            icon: <VideoCallIcon fontSize="large" color="primary" />,
          },
          {
            title: "Medical Records Management",
            description:
              "Easily manage and access your medical records online.",
            icon: <MedicalServicesIcon fontSize="large" color="secondary" />,
          },
        ].map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: 3,
              }}
            >
              <CardContent>
                {feature.icon}
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeatures;
