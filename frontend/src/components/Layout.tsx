import React, { FC, ReactNode, Suspense } from "react";
import Navbar from "./Navbar";
import { DarkModeProvider } from "../lib/context/darkModeContext";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import Footer from "./Footer";

const Layout: FC = ({ children }: any) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<Loading/>}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
