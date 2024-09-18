import { Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const ReviewButton = ({ handleOpenReviewModal }) => {
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleOpenReviewModal}
      sx={{ mt: theme.spacing(2) }}
    >
      Leave a Review
    </Button>
  );
};

ReviewButton.propTypes = {
  handleOpenReviewModal: PropTypes.func.isRequired,
};

export default ReviewButton;
