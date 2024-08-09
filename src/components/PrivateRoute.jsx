// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const currentUser = getCurrentUser();
  return currentUser ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
