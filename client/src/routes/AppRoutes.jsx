import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));

const AppRoutes = ({ authUser }) => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
    <Route
      path="/register"
      element={authUser ? <Navigate to="/" /> : <Register />}
    />
  </Routes>
);

AppRoutes.propTypes = {
  authUser: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

export default AppRoutes;
