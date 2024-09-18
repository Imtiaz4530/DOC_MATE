import { Typography, Grid, Card, Box } from "@mui/material";

const Faq = () => {
  return (
    <Box sx={{ py: 8, mb: 6 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Grid container spacing={4}>
        {[
          {
            question: "Is my data secure with Docmate?",
            answer:
              "Yes, Docmate uses advanced security measures to protect your data.",
          },
          {
            question: "Can I use Docmate on mobile devices?",
            answer:
              "Absolutely! Docmate is designed to work seamlessly on all devices.",
          },
          {
            question: "How do I contact customer support?",
            answer:
              "You can reach us via the contact form available on our website.",
          },
        ].map((faq, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ padding: 3, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                {faq.question}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {faq.answer}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Faq;
