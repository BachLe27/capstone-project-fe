import React from "react";
import { Navigate, useRoutes } from "react-router-dom"
import { LoadingSpin } from "src/components"
import AuthenticationLayout from "src/layouts/AuthenticationLayout/AuthenticationLayout"

const HomePage = React.lazy(() => import("src/pages/Home/HomePage"));
const LoginPage = React.lazy(() => import("src/pages/Login/LoginPage"));

const Router = () => {
  let routes = useRoutes([
    {
      path: '/', element: <HomePage />,
    },
    {
      element: <AuthenticationLayout />,
      children: [
        { path: '/login', element: <LoginPage /> }
      ]
    },
    {
      path: '*', element: <Navigate to='/' />
    }
  ].map((route) => {
    return {
      ...route,
      loader: LoadingSpin
    }
  }))
  return routes;
}

export default Router