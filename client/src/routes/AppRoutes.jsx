import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { lazy } from "react";

import PrivateRoute from "./PrivateRoute";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const DoctorList = lazy(() => import("../pages/DoctorList/DoctorList"));
const AppointmentDashboard = lazy(() =>
  import("../pages/PatientDashboard/PatientDashboard")
);
const DoctorDashboard = lazy(() =>
  import("../pages/DoctorDashboard/DoctorDashboard")
);
const Chat = lazy(() => import("../pages/Chat/Chat"));
const ScheduleAppointment = lazy(() =>
  import("../pages/ScheduleAppointment/ScheduleAppointment")
);
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const TermsAndConditions = lazy(() =>
  import("../pages/TermsAndCondition/TermsAndConditions")
);
const PrivacyPolicy = lazy(() =>
  import("../pages/PrivacyPolicy/PrivacyPolicy")
);

const AppRoutes = ({ authUser }) => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/terms" element={<TermsAndConditions />} />
    <Route path="/privacy" element={<PrivacyPolicy />} />
    <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
    <Route
      path="/register"
      element={authUser ? <Navigate to="/" /> : <Register />}
    />
    <Route
      path="/profile"
      element={authUser ? <Profile /> : <Navigate to="/login" />}
    />
    <Route
      path="/chat"
      element={authUser ? <Chat /> : <Navigate to="/login" />}
    />
    <Route
      path="/doctors"
      element={<PrivateRoute element={DoctorList} allowedRoles={["patient"]} />}
    />
    <Route
      path="/appointments/book"
      element={
        <PrivateRoute
          element={ScheduleAppointment}
          allowedRoles={["patient"]}
        />
      }
    />
    <Route
      path="/appointments"
      element={
        <PrivateRoute
          element={AppointmentDashboard}
          allowedRoles={["patient"]}
        />
      }
    />
    <Route
      path="/doctor/appointments"
      element={
        <PrivateRoute element={DoctorDashboard} allowedRoles={["doctor"]} />
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

AppRoutes.propTypes = {
  authUser: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

export default AppRoutes;
