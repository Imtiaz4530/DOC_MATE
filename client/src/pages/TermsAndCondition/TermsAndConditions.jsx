import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const TermsAndConditions = () => {
  const theme = useTheme();

  return (
    <PageWrapper>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Terms and Conditions
        </Typography>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(4),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="body1" paragraph>
            <strong>Effective Date:</strong> 01/10/2024
          </Typography>
          <Typography variant="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Docmate. By accessing or using our medical consultancy
            application, you agree to comply with and be bound by these Terms
            and Conditions. Please read them carefully before using our
            services.
          </Typography>
          <Typography variant="h2" gutterBottom>
            2. User Accounts
          </Typography>
          <Typography variant="body1" paragraph>
            To use certain features of our application, you must create an
            account. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under
            your account.
          </Typography>
          <Typography variant="h2" gutterBottom>
            3. Use of Services
          </Typography>
          <Typography variant="body1" paragraph>
            You agree to use our services only for lawful purposes and in
            accordance with these Terms and Conditions. You shall not:
          </Typography>
          <ul>
            <li>
              Use the application in any way that may harm, disable, or impair
              our services or interfere with other users' use of the
              application.
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the
              application or its related systems.
            </li>
          </ul>
          <Typography variant="h2" gutterBottom>
            4. Appointment Scheduling
          </Typography>
          <Typography variant="body1" paragraph>
            Patients can schedule appointments with doctors through the
            application. Doctors are responsible for managing their availability
            and appointment schedules. All appointment bookings are subject to
            confirmation and availability.
          </Typography>
          <Typography variant="h2" gutterBottom>
            5. Real-Time Communication
          </Typography>
          <Typography variant="body1" paragraph>
            The application provides chat and video consultation features. You
            agree to use these features responsibly and respect the privacy and
            confidentiality of other users.
          </Typography>
          <Typography variant="h2" gutterBottom>
            6. Medical Records
          </Typography>
          <Typography variant="body1" paragraph>
            Patients can upload and manage their medical records through the
            application. Doctors can access patients' medical records only for
            the purpose of providing medical consultation. All medical records
            are handled with the utmost confidentiality and in accordance with
            our Privacy Policy.
          </Typography>
          <Typography variant="h2" gutterBottom>
            7. Payment Integration
          </Typography>
          <Typography variant="body1" paragraph>
            If applicable, payments for consultations are processed through our
            payment gateway. You agree to provide accurate payment information
            and authorize us to charge the applicable fees.
          </Typography>
          <Typography variant="h2" gutterBottom>
            8. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            Docmate is not liable for any direct, indirect, incidental, or
            consequential damages arising from your use of the application or
            the inability to use the application. We do not guarantee the
            accuracy or reliability of any information provided through the
            application.
          </Typography>
          <Typography variant="h2" gutterBottom>
            9. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to suspend or terminate your account if you
            violate these Terms and Conditions or engage in any unlawful or
            prohibited activities.
          </Typography>
          <Typography variant="h2" gutterBottom>
            10. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We may update these Terms and Conditions from time to time. Any
            changes will be posted on this page, and your continued use of the
            application constitutes acceptance of the revised Terms and
            Conditions.
          </Typography>
          <Typography variant="h2" gutterBottom>
            11. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            For any questions or concerns regarding these Terms and Conditions,
            please contact us at: Email: support@docmate.com Address:
            DHAKA,BANGLADESH
          </Typography>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default TermsAndConditions;
