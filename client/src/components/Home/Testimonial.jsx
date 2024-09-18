import { Typography, Grid, Card, Box } from "@mui/material";
import { COLORS } from "../../theme";

const Testimonial = () => {
  return (
    <Box sx={{ py: 8, mb: 6, backgroundColor: COLORS.cardBackground }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        What Our Users Say
      </Typography>
      <Grid container spacing={4}>
        {[
          {
            quote:
              "Docmate has revolutionized the way I manage my health. Booking appointments has never been easier!",
            author: "John Doe",
          },
          {
            quote:
              "The video consultation feature saved me a trip to the clinic. Highly recommend!",
            author: "Jane Smith",
          },
        ].map((testimonial, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ padding: 3, boxShadow: 3 }}>
              <Typography variant="body1" paragraph>
                {testimonial.quote}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                - {testimonial.author}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonial;
