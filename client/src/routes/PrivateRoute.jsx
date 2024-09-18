import { Navigate } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import PropTypes from "prop-types";

const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const authUser = useStoreState((state) => state.user.user);

  if (!authUser) {
    return <Navigate to="/login" />;
  } else if (!allowedRoles.includes(authUser.role)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
