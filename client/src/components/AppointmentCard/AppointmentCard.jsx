import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ReviewButton from "./ReviewButton";
import ReviewModal from "./ReviewModal";
import PendingButton from "./PendingButton";
import StartChatButton from "./StartChatButton";

const AppointmentCard = ({
  appointment,
  handleSelectedConversation,
  userRole,
  handleAccept,
  handleReject,
}) => {
  const theme = useTheme();
  const { status, date, time, doctor, patient } = appointment;
  const [showChatButton, setShowChatButton] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const handleOpenReviewModal = () => {
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const [hours, minutes] = time.split(":");
      const appointmentDateTime = new Date(date);
      const currentTime = new Date();

      appointmentDateTime.setHours(hours, minutes, 0, 0);

      const difference = appointmentDateTime - currentTime;

      if (difference > 0 && difference <= 10 * 60 * 1000) {
        setTimeLeft(difference);
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();

    const timerInterval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [date, time]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const [hours, minutes] = time.split(":");
    const currentDateTime = new Date();
    const appointmentDateTime = new Date(date);

    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const expirationDateTime = new Date(appointmentDateTime);
    expirationDateTime.setMinutes(appointmentDateTime.getMinutes() + 30);

    if (
      status === "confirmed" &&
      currentDateTime >= appointmentDateTime &&
      currentDateTime <= expirationDateTime
    ) {
      setShowChatButton(true);
    } else {
      setShowChatButton(false);
    }
  }, [status, date, time]);

  const handleReview = async (id) => {
    try {
      await axiosInstance.get(`/api/appointments/review/${id}`);
      setOpenReviewModal(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        borderRadius: 2,
        overflow: "hidden",
        background: theme.palette.background.default,
        boxShadow: theme.shadows[2],
        position: "relative",
        height: "250px",
      }}
    >
      <Box
        sx={{
          width: 8,
          backgroundColor:
            status === "pending"
              ? theme.palette.warning.main
              : status === "confirmed"
              ? theme.palette.success.main
              : status === "completed"
              ? theme.palette.info.main
              : theme.palette.error.main,
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: theme.spacing(5),
        }}
      >
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <AssignmentIndIcon color="primary" sx={{ mr: theme.spacing(2) }} />
            <Typography variant="h6" fontWeight="bold">
              {userRole === "doctor" ? patient?.name : doctor?.name}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <CalendarTodayIcon color="action" sx={{ mr: theme.spacing(2) }} />
            <Typography variant="body2" color="text.secondary">
              {`Date: ${new Date(date).toLocaleDateString()}`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={4}>
            <AccessTimeIcon color="action" sx={{ mr: theme.spacing(2) }} />
            <Typography variant="body2" color="text.secondary">
              {`Time: ${time}`}
            </Typography>
          </Box>
          <Chip
            label={status}
            sx={{
              mt: 1,
              fontWeight: "bold",
              backgroundColor:
                status === "pending"
                  ? theme.palette.warning.light
                  : status === "confirmed"
                  ? theme.palette.success.light
                  : status === "completed"
                  ? theme.palette.info.light
                  : theme.palette.error.light,
              color: theme.palette.common.white,
            }}
          />
          {/* Display countdown timer when timeLeft is available */}
          {status === "confirmed" && timeLeft !== null && (
            <Typography
              variant="h6"
              color="error"
              sx={{ mt: theme.spacing(4), fontWeight: "bold" }}
            >
              Starts in: {formatTime(timeLeft)}
            </Typography>
          )}
        </Box>

        {/* Conditionally render buttons based on role and status */}
        {userRole === "doctor" && status === "pending" && (
          <PendingButton
            handleAccept={handleAccept}
            handleReject={handleReject}
          />
        )}
        {showChatButton && (
          <StartChatButton
            appointmentId={appointment?._id}
            doctor={doctor}
            patient={patient}
            userRole={userRole}
            handleSelectedConversation={handleSelectedConversation}
          />
        )}
        {status === "cancelled" && (
          <Typography>{appointment.rejectMessage}</Typography>
        )}

        {status === "completed" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: theme.spacing(4),
            }}
          >
            <Typography color="success">
              Your appointment is completed.
            </Typography>
            {userRole === "patient" && appointment.isReview && (
              <>
                <ReviewButton handleOpenReviewModal={handleOpenReviewModal} />

                {/* Modal for leaving a review */}
                <ReviewModal
                  appointmentId={appointment?._id}
                  handleCloseReviewModal={handleCloseReviewModal}
                  handleReview={handleReview}
                  openReviewModal={openReviewModal}
                />
              </>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.object.isRequired,
  handleSelectedConversation: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  handleAccept: PropTypes.func,
  handleReject: PropTypes.func,
};

export default AppointmentCard;
