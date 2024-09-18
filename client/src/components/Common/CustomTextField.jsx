import { TextField, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const CustomTextField = React.forwardRef(
  (
    {
      type,
      label,
      name,
      value,
      onChange,
      margin = "normal",
      onBlur,
      fullWidth = true,
      disabled = false,
      gridProps = {},
      error,
      helperText,
      ...props
    },
    ref
  ) => {
    const Content = (
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        margin={margin}
        onBlur={onBlur}
        disabled={disabled}
        type={type || "string"}
        error={error}
        helperText={helperText}
        ref={ref}
        {...props}
      />
    );

    return gridProps ? (
      <Grid item {...gridProps}>
        {Content}
      </Grid>
    ) : (
      Content
    );
  }
);

CustomTextField.displayName = "CustomTextField";

CustomTextField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  gridProps: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default CustomTextField;
