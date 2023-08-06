import React, { FC, useEffect, useRef, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import useEf from "react";
import { useDarkMode } from "../lib/context/darkModeContext";

const Navbar: FC = () => {
  const { setDarkMode, darkMode } = useDarkMode();
  const [open, setOpen] = useState(false);
  const navbar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      navbar.current?.classList.add("open");
    } else {
      navbar.current?.classList.remove("open");
    }
  }, [open]);

  return (
    <>
      <div id="nav-container">
        <div id="nav-top-items">
          <div id="burger-menu" onClick={() => setOpen(!open)}>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
          </div>
          <Link onClick={() => setDarkMode(!darkMode)} to={""} id="theme-toggle" className="link"><h1 className="link-text">{ darkMode == true ? <FaSun/> : <FaMoon/> }</h1></Link>
        </div>
        <nav id="navbar" ref={navbar}>
          <Link className="link" to={"/"}><h1 className="link-text">Dashboard</h1></Link>
          <Link className="link" to={"/orders"}><h1 className="link-text">Orders</h1></Link>
          <Link className="link" to={"/graphs"}><h1 className="link-text">Graphs</h1></Link>
          <Link className="link" to={"/profile"}><h1 className="link-text">Profile</h1></Link>
        </nav>
      </div>
    </>
  );
};
export default Navbar;
