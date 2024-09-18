import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Modal,
} from "@mui/material";

import LoadingSpinner from "../../components/Common/LoadingSpinner";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ErrorComponent from "../../components/Common/ErrorComponent";
import useDoctorDashboard from "../../hooks/doctorDashboard/useDoctorDashboard";
import NoDataMessage from "../../components/Common/NoDataMessage";

const DoctorDashboard = () => {
  const {
    loading,
    appointments,
    error,
    rejectModalOpen,
    handleRejectConfirm,
    handleReject,
    handleAccept,
    handleSelectedConversation,
    setRejectModalOpen,
    rejectMessage,
    setRejectMessage,
  } = useDoctorDashboard();

  if (loading) return <LoadingSpinner message="Loading Appointments..." />;

  if (error) return <ErrorComponent errorMessage={error} />;

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
                    userRole="doctor"
                    handleAccept={() => handleAccept(appointment._id)}
                    handleReject={() => handleReject(appointment._id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Reject Modal */}
        <Modal
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          aria-labelledby="reject-modal-title"
          aria-describedby="reject-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="reject-modal-title" variant="h6" component="h2">
              Reject Appointment
            </Typography>
            <TextField
              fullWidth
              label="Reason for rejection"
              variant="outlined"
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value)}
              multiline
              required
              rows={3}
              sx={{ mt: 2 }}
            />
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="error"
                onClick={handleRejectConfirm}
              >
                Confirm Reject
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </PageWrapper>
  );
};

export default DoctorDashboard;
