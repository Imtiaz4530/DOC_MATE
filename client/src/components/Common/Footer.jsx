import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

import { COLORS } from "../../theme";
import logo from "/logo.png";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: COLORS.primary,
        color: COLORS.textPrimary,
        py: { xs: 4, sm: 6 },
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          {/* Logo and About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" mb={4}>
              <img
                src={logo}
                alt="Docmate Logo"
                style={{ width: 50, marginRight: theme.spacing(2) }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: COLORS.background,
                  letterSpacing: theme.spacing(1),
                  fontWeight: 600,
                }}
              >
                Docmate
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
              Docmate is your reliable partner for medical consultations,
              connecting you with healthcare professionals from the comfort of
              your home.
            </Typography>
          </Grid>

          {/* Primary Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Primary
            </Typography>
            <Box>
              <Link
                href="/terms"
                underline="hover"
                sx={{ display: "block", color: COLORS.textPrimary, mb: 1 }}
              >
                Terms and Conditions
              </Link>
              <Link
                href="/privacy"
                underline="hover"
                sx={{ display: "block", color: COLORS.textPrimary }}
              >
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: COLORS.textSecondary, mb: 1 }}
            >
              Address: 123 Medical Lane, City, Country
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: COLORS.textSecondary, mb: 1 }}
            >
              Phone: +123 456 7890
            </Typography>
            <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
              Email: support@docmate.com
            </Typography>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
              <Link
                href="https://facebook.com/"
                target="_blank"
                aria-label="Facebook"
              >
                <Facebook
                  sx={{
                    color: COLORS.textPrimary,
                    transition: "color 0.4s, transform 0.4s",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
              <Link
                href="https://twitter.com/"
                target="_blank"
                aria-label="Twitter"
              >
                <Twitter
                  sx={{
                    color: COLORS.textPrimary,
                    transition: "color 0.4s, transform 0.4s",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
              <Link
                href="https://instagram.com/"
                target="_blank"
                aria-label="Instagram"
              >
                <Instagram
                  sx={{
                    color: COLORS.textPrimary,
                    transition: "color 0.4s, transform 0.4s",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
              <Link
                href="https://linkedin.com/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <LinkedIn
                  sx={{
                    color: COLORS.textPrimary,
                    transition: "color 0.4s, transform 0.4s",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                      transform: "scale(1.2)",
                    },
                  }}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ textAlign: "center", mt: 4, py: 4 }}>
          <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
            &copy; {new Date().getFullYear()} Docmate. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
