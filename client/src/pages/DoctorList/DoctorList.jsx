import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";

import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from "../../theme";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import useDoctorList from "../../hooks/doctorList/useDoctorList";
import NoDataMessage from "../../components/Common/NoDataMessage";

const DoctorCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  padding: SPACING.md,
  boxShadow: SHADOWS.md,
  borderRadius: theme.shape.borderRadius,
  height: "300px",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: SHADOWS.lg,
  },
}));

const CardContentWrapper = styled(CardContent)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const DoctorList = () => {
  const { doctors, handleSelectDoctor, loading } = useDoctorList();

  if (loading) return <LoadingSpinner message="Loading Available Doctors..." />;

  return (
    <PageWrapper>
      <Container
        sx={{
          padding: SPACING.lg,
          maxWidth: "lg",
        }}
      >
        <Typography variant="h4" gutterBottom sx={TYPOGRAPHY.h4}>
          Available Doctors
        </Typography>
        <Grid container spacing={SPACING.md}>
          {doctors.length === 0 ? (
            <NoDataMessage message="No doctors available." />
          ) : (
            doctors.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor._id}>
                <DoctorCard>
                  <CardContentWrapper>
                    <div>
                      <Typography variant="h6" sx={TYPOGRAPHY.h6}>
                        {doctor.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color={COLORS.textSecondary}
                      >
                        Specialty: {doctor.specialization}
                      </Typography>
                      <Typography variant="body2" color={COLORS.textSecondary}>
                        Available Times: {doctor.availability.join(", ")}
                      </Typography>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectDoctor(doctor)}
                      sx={{ marginTop: SPACING.md }}
                    >
                      Book Appointment
                    </Button>
                  </CardContentWrapper>
                </DoctorCard>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default DoctorList;
