import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";

const ReviewModal = ({
  openReviewModal,
  handleCloseReviewModal,
  handleReview,
  appointmentId,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={openReviewModal}
      onClose={handleCloseReviewModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Leave a Review</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Your feedback is valuable:
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(3),
          }}
        >
          <textarea
            rows={6}
            style={{
              width: "100%",
              padding: theme.spacing(2),
              borderRadius: "8px",
              border: `1px solid ${theme.palette.divider}`,
              resize: "none",
              outline: "none",
              fontSize: "1rem",
              fontFamily: theme.typography.fontFamily,
            }}
            placeholder="Write your review here..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseReviewModal} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReview(appointmentId)}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ReviewModal.propTypes = {
  openReviewModal: PropTypes.func.isRequired,
  handleCloseReviewModal: PropTypes.func.isRequired,
  handleReview: PropTypes.func.isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default ReviewModal;
