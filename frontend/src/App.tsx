import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages";
import Layout from "./components/Layout";
import { DarkModeProvider } from "./lib/context/darkModeContext";

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
      { path: "/dashboard", element: <Home /> },
      { path: "/orders", element: <Orders /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </>
  );
}

export default App;
