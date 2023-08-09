import React, { FC, ReactNode, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loading, Footer, Navbar } from "./";

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
