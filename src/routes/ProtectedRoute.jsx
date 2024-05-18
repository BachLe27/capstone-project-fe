import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  fallback,
  children,
}) => {
  if (!isAllowed) return fallback ?? <Navigate to={redirectPath} replace />;

  return children ?? <Outlet />;
};

export default ProtectedRoute;
