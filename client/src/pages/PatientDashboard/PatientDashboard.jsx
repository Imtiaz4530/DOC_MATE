import { Container, Typography, Grid, Box } from "@mui/material";

import LoadingSpinner from "../../components/Common/LoadingSpinner";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import usePatientDashboard from "../../hooks/patientDashboard/usePatientDashboard";
import NoDataMessage from "../../components/Common/NoDataMessage";

const PatientDashboard = () => {
  const { appointments, handleSelectedConversation, loading } =
    usePatientDashboard();

  if (loading) return <LoadingSpinner message="Loading Appointments..." />;

  return (
    <PageWrapper>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Your Appointments
        </Typography>
        <Box maxHeight="60vh" overflow="auto">
          {appointments.length === 0 ? (
            <NoDataMessage message="You Currently have No appointments." />
          ) : (
            <Grid container spacing={3}>
              {appointments.map((appointment) => (
                <Grid item xs={12} key={appointment._id}>
                  <AppointmentCard
                    appointment={appointment}
                    handleSelectedConversation={handleSelectedConversation}
                    userRole="patient"
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default PatientDashboard;
