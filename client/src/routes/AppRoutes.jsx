import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
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
    <Route path="*" element={<NotFound />} />
  </Routes>
);

AppRoutes.propTypes = {
  authUser: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

export default AppRoutes;
