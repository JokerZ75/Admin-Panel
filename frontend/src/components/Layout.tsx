import React, { FC, ReactNode, Suspense } from "react";
import Navbar from "./Navbar";
import { DarkModeProvider } from "../lib/context/darkModeContext";
import { Outlet } from "react-router-dom";

const Layout: FC = ({ children }: any) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
};

export default Layout;
