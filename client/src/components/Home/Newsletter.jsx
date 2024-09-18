import { Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";

import { COLORS } from "../../theme";

const Newsletter = () => {
  const [newsletter, setNewsletter] = useState("");
  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
        mb: 6,
        backgroundColor: COLORS.cardBackground,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Stay Updated with Our Newsletter
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Sign up for our newsletter to receive the latest updates, health tips,
        and special offers directly to your inbox.
      </Typography>
      <Box
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          type="email"
          label="Enter your email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setNewsletter(e.target.value)}
          value={newsletter}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          onClick={() => setNewsletter("")}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Newsletter;
