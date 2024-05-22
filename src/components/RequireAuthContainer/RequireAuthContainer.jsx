import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthContext } from '@/contexts/AuthContext';
import { AuthLoading } from '..';

const RequireAuthContainer = ({ navigateTo = '/login', redirect = false }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <AuthLoading />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={`${navigateTo}${redirect ? `?redirectTo=${location.pathname}` : ''}`}
    />
  );
};

export default RequireAuthContainer;
