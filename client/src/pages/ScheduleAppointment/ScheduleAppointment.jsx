import { Container, Button, Typography, Paper, Box, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import CustomTextField from "../../components/Common/CustomTextField";
import useScheduleAppointment from "../../hooks/scheduleAppointment/useScheduleAppointment";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const ScheduleAppointment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const selectedDate = watch("date");
  const navigate = useNavigate();

  const {
    loading,
    scheduleAppointment,
    maxDate,
    today,
    validateDate,
    validateTime,
    doctorName,
  } = useScheduleAppointment();

  const onSubmit = (data) => {
    scheduleAppointment(data, navigate);
    reset();
  };

  return (
    <PageWrapper>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: (theme) => theme.palette.background.default,
            boxShadow: (theme) => theme.shadows[2],
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Schedule an Appointment with {doctorName}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="date"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Date is required",
                    validate: validateDate,
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Select Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: formatDate(today),
                        max: formatDate(maxDate),
                      }}
                      fullWidth
                      error={!!errors.date}
                      helperText={errors.date ? errors.date.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="time"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Time is required",
                    validate: (time) => validateTime(time, selectedDate),
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Select Time"
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!errors.time}
                      helperText={errors.time ? errors.time.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="reason"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Reason is required" }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Reason for Appointment"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!errors.reason}
                      helperText={errors.reason ? errors.reason.message : ""}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{
                  paddingX: 4,
                  boxShadow: (theme) => theme.shadows[1],
                }}
              >
                Schedule Appointment
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </PageWrapper>
  );
};

export default ScheduleAppointment;
