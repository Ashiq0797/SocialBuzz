import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Pass the user prop to the child components if needed
  return React.cloneElement(children, { user });
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element.isRequired
};