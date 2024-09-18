import { Container, Box, Avatar, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

import CustomTypography from "../../components/Common/CustomTypo";
import useProfile from "../../hooks/profile/useProfile";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ProfileData from "../../components/Profile/ProfileData";
import EditProfile from "../../components/Profile/EditProfile";

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Profile = () => {
  const theme = useTheme();
  const { authUser, editMode, profile, setEditMode, dob, onSubmit, loading } =
    useProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name || authUser.name,
      username: profile.username || authUser.username,
      email: profile.email || authUser.email,
      phone: profile.phone?.toString() || authUser.phone?.toString(),
      gender: profile.gender || authUser.gender,
      dateOfBirth: dob,
      role: profile.role || authUser.role,
    },
  });

  return (
    <PageWrapper>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <ProfilePaper elevation={3}>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              alt="Profile Picture"
              src={profile.profilePic}
              sx={{
                width: 120,
                height: 120,
                mb: 4,
                border: `3px solid ${theme.palette.primary.main}`,
                boxShadow: theme.shadows[3],
              }}
            />
          </Box>
          <Box mb={6}>
            {editMode ? (
              <CustomTypography variant="h4" component="h1" gutterBottom>
                Edit Profile
              </CustomTypography>
            ) : (
              <CustomTypography variant="h4" component="h1" gutterBottom>
                Profile
              </CustomTypography>
            )}
          </Box>
          {editMode ? (
            <EditProfile
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              loading={loading}
              onSubmit={onSubmit}
              setEditMode={setEditMode}
            />
          ) : (
            <ProfileData
              dob={dob}
              email={profile.email || authUser.email}
              username={profile.username || authUser.username}
              gender={profile.gender || authUser.gender}
              name={profile.name || authUser.name}
              phone={profile.phone || authUser.phone}
              role={profile.role || authUser.role}
              setEditMode={setEditMode}
            />
          )}
        </ProfilePaper>
      </Container>
    </PageWrapper>
  );
};

export default Profile;
