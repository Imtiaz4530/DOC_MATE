import { Button, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

import CustomTextField from "../Common/CustomTextField";

const EditProfile = ({
  handleSubmit,
  onSubmit,
  control,
  errors,
  loading,
  setEditMode,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Name"
              gridProps={{ xs: 12, sm: 6 }}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Username"
              gridProps={{ xs: 12, sm: 6 }}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Email"
              gridProps={{ xs: 12, sm: 6 }}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Phone"
              gridProps={{ xs: 12, sm: 6 }}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ""}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Gender"
              gridProps={{ xs: 12, sm: 6 }}
              error={!!errors.gender}
              helperText={errors.gender ? errors.gender.message : ""}
            />
          )}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Date of Birth"
              gridProps={{ xs: 12, sm: 6 }}
              disabled
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Role"
              gridProps={{ xs: 12 }}
              disabled
            />
          )}
        />
        <Grid item xs={12} mt={4}>
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Save
          </Button>
          <Button
            disabled={loading}
            onClick={() => setEditMode(false)}
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 4 }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

EditProfile.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func,
};

export default EditProfile;
