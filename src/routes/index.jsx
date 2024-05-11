import { Navigate, useRoutes } from 'react-router-dom';

import { AuthLoading, RequireAuthContainer } from '@/components';
import AuthenticationLayout from '@/layouts/AuthenticationLayout/AuthenticationLayout';
import LoginPage from '@/pages/Authentication/Login/LoginPage';
import RegisterPage from '@/pages/Authentication/Register/RegisterPage';
import HomePage from '@/pages/Home/HomePage';

const Router = () => {
  const routes = useRoutes(
    [
      {
        element: <RequireAuthContainer navigateTo="/auth/sign-in" redirect />,
        children: [
          {
            path: '/home',
            element: <HomePage />,
          },
        ],
      },
      {
        element: <AuthenticationLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          // Temporary
          { path: '/', element: <LoginPage /> },
          {
            path: '/register',
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ].map((route) => {
      return {
        ...route,
        loader: AuthLoading,
      };
    }),
  );

  return routes;
};

export default Router;
