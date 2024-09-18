import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from "../../theme";

import "../../styles/AuthForm.css";
import Doctor from "/doc.png";
import LoginPic from "/log.png";

const AuthForm = ({ title, fields, onSubmit, buttonLabel, loading }) => {
  const [five, setFive] = useState(null);
  const [four, setFour] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (fields.length > 2) {
      setFive(fields.slice(0, 5));
      setFour(fields.slice(5, 9));
    }
  }, [fields]);

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: SPACING.lg,
        mb: "20px",
      }}
    >
      <Grid
        container
        sx={{
          boxShadow: SHADOWS.md,
          borderRadius: SPACING.sm,
          overflow: "hidden",
          bgcolor: COLORS.cardBackground,
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            bgcolor: COLORS.cardBackground,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: SPACING.lg,
          }}
        >
          <img
            src={title === "Register" ? Doctor : LoginPic}
            alt="Illustration"
            style={{ width: "100%", maxWidth: "350px", marginBottom: "2rem" }}
          />
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={TYPOGRAPHY.h4}
          >
            Docmate
          </Typography>
          {(title === "Register" || title === "Edit Your Profile") && (
            <Typography
              variant="subtitle1"
              gutterBottom
              align="center"
              sx={TYPOGRAPHY.body1}
            >
              Seamless Healthcare Access and Consultation at Your Fingertips.
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: SPACING.lg,
          }}
        >
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="authenticationForm"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              maxWidth="600px"
              sx={{ gap: SPACING.sm }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={TYPOGRAPHY.h5}
              >
                Docmate {title}
              </Typography>

              {fields.length > 2 ? (
                <Grid container spacing={SPACING.sm}>
                  <Grid item xs={12} sm={6}>
                    {five &&
                      five?.map(
                        ({ label, name, type, validation, select, options }) =>
                          select ? (
                            <TextField
                              key={name}
                              label={label}
                              select
                              fullWidth
                              margin="normal"
                              SelectProps={{ native: true }}
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            >
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <TextField
                              key={name}
                              label={label}
                              type={type}
                              fullWidth
                              margin="normal"
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            />
                          )
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {four &&
                      four?.map(
                        ({ label, name, type, validation, select, options }) =>
                          select ? (
                            <TextField
                              key={name}
                              label={label}
                              select
                              fullWidth
                              margin="normal"
                              SelectProps={{ native: true }}
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            >
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                            <TextField
                              key={name}
                              label={label}
                              type={type}
                              fullWidth
                              margin="normal"
                              {...register(name, validation)}
                              error={!!errors[name]}
                              helperText={
                                errors[name] ? errors[name].message : ""
                              }
                              className="auth-form-field"
                            />
                          )
                      )}
                  </Grid>
                </Grid>
              ) : (
                fields.map(({ label, name, type, validation }) => (
                  <TextField
                    key={name}
                    label={label}
                    type={type}
                    fullWidth
                    margin="normal"
                    {...register(name, validation)}
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name].message : ""}
                    className="auth-form-field"
                  />
                ))
              )}

              {title === "Login" && (
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    alignSelf: "flex-end",
                    marginBottom: SPACING.sm,
                    ...TYPOGRAPHY.body2,
                  }}
                >
                  Forgot password?
                </Link>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginBottom: SPACING.sm,
                  marginTop: SPACING.xs,
                }}
                disabled={loading}
              >
                {buttonLabel}
              </Button>
              {title === "Login" ? (
                <Link
                  href="/register"
                  variant="body2"
                  sx={{ marginTop: SPACING.sm, ...TYPOGRAPHY.body2 }}
                >
                  Are you new? Create an Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ marginTop: SPACING.sm, ...TYPOGRAPHY.body2 }}
                >
                  Already have an account? Login here
                </Link>
              )}
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      validation: PropTypes.object,
      select: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default AuthForm;
