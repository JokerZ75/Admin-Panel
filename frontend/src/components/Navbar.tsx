import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";

interface LinkElProps {
  to: string;
  element: any;
}

const LinkElement: FC<LinkElProps> = ({ to, element }) => {
  return <Link to={to}>{element}</Link>;
};

const Navbar:FC = () => {
  return (
    <>
      <nav>
        <LinkElement to="/" element={<h1>Home</h1>} />
        <LinkElement to="/test" element={<h1>Test</h1>} />
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
