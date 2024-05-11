import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import AuthLoading from './AuthLoading';
import { AuthContext } from '@/contexts/AuthContext';

const RequireAuthContainer = ({ navigateTo = '/login', redirect = false }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  if (typeof isAuthenticated === 'boolean') {
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate
        to={`${navigateTo}${redirect ? `?redirectTo=${location.pathname}` : ''}`}
      />
    );
  }
  return <AuthLoading />;
};

export default RequireAuthContainer;
