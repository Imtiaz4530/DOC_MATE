import { Typography, Avatar, Paper, IconButton, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircleIcon from "@mui/icons-material/Circle";
import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";

const ChatHeader = ({ conversation, onBack }) => {
  const { onlineUsers } = useStoreState((state) => state.socket);

  const isOnline = onlineUsers.includes(conversation?._id);

  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: theme.spacing(3),
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <IconButton
        onClick={onBack}
        sx={{
          color: theme.palette.text.primary,
          marginRight: theme.spacing(1),
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Avatar
        src={conversation?.profilePic}
        alt="Contact Profile"
        sx={{
          width: 48,
          height: 48,
          marginRight: theme.spacing(1.5),
          border: `2px solid ${theme.palette.text.primary}`,
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        sx={{ marginLeft: theme.spacing(2) }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {conversation?.name}
        </Typography>
        {isOnline && (
          <Box display="flex" alignItems="center">
            <CircleIcon
              sx={{
                fontSize: 10,
                color: theme.palette.success.main,
                marginRight: theme.spacing(0.5),
              }}
            />
            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
              Online
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

ChatHeader.propTypes = {
  conversation: PropTypes.shape({
    profilePic: PropTypes.string,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string,
  }),
  onBack: PropTypes.func,
};

export default ChatHeader;
