import React, { FC, ReactNode, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loading, Footer, Navbar } from "./";
import { Toaster } from "react-hot-toast";


const Layout: FC = ({ children }: any) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<Loading />}>
          <Toaster />
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
