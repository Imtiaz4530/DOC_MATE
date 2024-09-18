/* eslint-disable react/prop-types */
import { Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const StartChatButton = ({
  handleSelectedConversation,
  userRole,
  appointmentId,
  patient,
  doctor,
}) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() =>
        handleSelectedConversation(
          userRole === "doctor" ? patient : doctor,
          appointmentId
        )
      }
      sx={{
        mt: theme.spacing(2),
        alignSelf: "flex-start",
      }}
    >
      Start Chat
    </Button>
  );
};

StartChatButton.propTypes = {
  handleSelectedConversation: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default StartChatButton;
