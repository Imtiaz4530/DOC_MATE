import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomTypography from "../Common/CustomTypo";

const ProfileData = ({
  name,
  username,
  email,
  phone,
  gender,
  dob,
  role,
  setEditMode,
}) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <CustomTypography variant="body1">
          <strong>Name:</strong> {name}
        </CustomTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTypography variant="body1">
          <strong>Username:</strong> {username}
        </CustomTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTypography variant="body1">
          <strong>Email:</strong> {email}
        </CustomTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTypography variant="body1">
          <strong>Phone:</strong> {phone}
        </CustomTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTypography variant="body1">
          <strong>Gender:</strong> {gender}
        </CustomTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTypography variant="body1">
          <strong>Date of Birth:</strong> {dob}
        </CustomTypography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTypography variant="body1">
          <strong>Role:</strong> {role}
        </CustomTypography>
      </Grid>
      <Grid item xs={12} mt={4}>
        <Button
          onClick={() => setEditMode(true)}
          variant="contained"
          color="primary"
          fullWidth
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

ProfileData.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setEditMode: PropTypes.func,
};

export default ProfileData;
