import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages";
import Layout from "./components/Layout";
import { DarkModeProvider } from "./lib/context/darkModeContext";


const Orders = lazy(() => import("./pages/Orders"));
const Graphs = lazy(() => import("./pages/Graphs"));
const Profile = lazy(() => import("./pages/Profile"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/orders", element: <Orders /> },
      { path: "/graphs", element: <Graphs /> },
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
