import { Container, Typography, Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const PrivacyPolicy = () => {
  const theme = useTheme();

  return (
    <PageWrapper>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Privacy Policy
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
            Welcome to Docmate. We are committed to protecting your privacy and
            ensuring that your personal information is handled in a safe and
            responsible manner. This Privacy Policy outlines how we collect,
            use, and protect your information when you use our medical
            consultancy application.
          </Typography>
          <Typography variant="h2" gutterBottom>
            2. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information from you when you:
          </Typography>
          <ul>
            <li>Register or log in to your account</li>
            <li>Schedule an appointment</li>
            <li>Use our chat and video consultation features</li>
            <li>Upload medical records</li>
          </ul>
          <Typography variant="body1" paragraph>
            The types of information we collect include:
          </Typography>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and other contact details.
            </li>
            <li>
              <strong>Medical Information:</strong> Health history, medical
              records, and appointment details.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about your interactions
              with our application, including chat messages and video
              consultation logs.
            </li>
          </ul>
          <Typography variant="h2" gutterBottom>
            3. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the collected information to:
          </Typography>
          <ul>
            <li>
              Provide and manage our services, including scheduling appointments
              and facilitating consultations.
            </li>
            <li>
              Communicate with you regarding your appointments, notifications,
              and other service-related matters.
            </li>
            <li>
              Improve our services and application functionality based on user
              feedback and usage patterns.
            </li>
            <li>
              Ensure the security and integrity of our application and prevent
              fraud.
            </li>
          </ul>
          <Typography variant="h2" gutterBottom>
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement reasonable technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, and destruction. We use encryption, secure
            authentication, and other security practices to safeguard your data.
          </Typography>
          <Typography variant="h2" gutterBottom>
            5. Data Sharing
          </Typography>
          <Typography variant="body1" paragraph>
            We do not share your personal information with third parties except
            in the following cases:
          </Typography>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party service providers who assist us in operating our
              application and providing services.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information
              if required by law or to protect our rights, privacy, safety, or
              property, or that of our users or others.
            </li>
          </ul>
          <Typography variant="h2" gutterBottom>
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to:
          </Typography>
          <ul>
            <li>Access and update your personal information</li>
            <li>Request the deletion of your data</li>
            <li>Opt-out of receiving marketing communications</li>
          </ul>
          <Typography variant="body1" paragraph>
            To exercise your rights or if you have any questions about our
            Privacy Policy, please contact us at{" "}
            <Link href="support@docmate.com">support@docmate.com</Link>.
          </Typography>
          <Typography variant="h2" gutterBottom>
            7. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and we encourage you to review it
            periodically.
          </Typography>
          <Typography variant="h2" gutterBottom>
            8. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong>{" "}
            <Link href="support@docmate.com">support@docmate.com</Link>
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Address:</strong> DHAKA,BANGLADESH
          </Typography>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
