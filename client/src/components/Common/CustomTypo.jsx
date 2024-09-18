import { Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";

const CustomTypography = ({
  variant = "body1",
  component,
  gutterBottom = false,
  children,
  gridProps = {},
}) => {
  const Content = (
    <Typography
      variant={variant}
      component={component}
      gutterBottom={gutterBottom}
    >
      {children}
    </Typography>
  );

  return gridProps ? <Grid {...gridProps}>{Content}</Grid> : Content;
};

CustomTypography.propTypes = {
  variant: PropTypes.string,
  component: PropTypes.string,
  gutterBottom: PropTypes.bool,
  children: PropTypes.node.isRequired,
  gridProps: PropTypes.object,
};

export default CustomTypography;
