import { Navigate, useRoutes } from 'react-router-dom';
import React from 'react';

import { RequireAuthContainer, SuspenseContainer } from '@/components';
import useAuth from '@/hooks/useAuth';
import AuthenticationLayout from '@/layouts/AuthenticationLayout/AuthenticationLayout';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';

import ProtectedRoute from './ProtectedRoute';

const HomePage = React.lazy(() => import('@/pages/Home/HomePage'));

// Authentication
const LoginPage = React.lazy(
  () => import('@/pages/Authentication/Login/LoginPage'),
);
const RegisterPage = React.lazy(
  () => import('@/pages/Authentication/Register/RegisterPage'),
);

// Manage organization
const ManageOrganizationPage = React.lazy(
  () => import('@/pages/Admin/Organization/ManageOrganizationPage'),
);

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
            {
              path: '/manage-organization',
              element: <ManageOrganizationPage />,
            },
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

  return <SuspenseContainer>{routes}</SuspenseContainer>;
};

export default Router;
