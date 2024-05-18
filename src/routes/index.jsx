import { Navigate, useRoutes } from 'react-router-dom';

import { RequireAuthContainer } from '@/components';
import AuthenticationLayout from '@/layouts/AuthenticationLayout/AuthenticationLayout';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';
import LoginPage from '@/pages/Authentication/Login/LoginPage';
import RegisterPage from '@/pages/Authentication/Register/RegisterPage';
import HomePage from '@/pages/Home/HomePage';
import useAuth from '@/hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    {
      element: <RequireAuthContainer navigateTo="/login" redirect />,
      children: [
        {
          element: <DashboardLayout />,
          children: [
            { path: '/home', element: <HomePage /> },
            { path: '/', element: <HomePage /> },
          ],
        },
      ],
    },
    {
      element: <ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/" />,
      children: [
        {
          element: <AuthenticationLayout />,
          children: [
            { path: '/login', element: <LoginPage /> },
            {
              path: '/register',
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ]);

  return routes;
};

export default Router;
