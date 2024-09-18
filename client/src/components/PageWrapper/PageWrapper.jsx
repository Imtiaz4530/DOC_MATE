import PropTypes from "prop-types";
import { Box } from "@mui/material";

const PageWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        marginTop: "50px",
        marginBottom: "100px",
      }}
    >
      {children}
    </Box>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
