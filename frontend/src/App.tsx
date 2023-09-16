import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages";
import Layout from "./components/Layout";
import { DarkModeProvider } from "./lib/context/darkModeContext";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import refreshAuthLogic from "./lib/refreashApi";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>There has been an error try again later</div>,
    children: [
      { path: "/", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/dashboard",
        element: (
          <RequireAuth loginPath="/">
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/orders",
        element: (
          <RequireAuth loginPath="/">
            <Orders />
          </RequireAuth>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireAuth loginPath="/">
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
          refresh={refreshAuthLogic}
        >
          <RouterProvider router={router} />
        </AuthProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
