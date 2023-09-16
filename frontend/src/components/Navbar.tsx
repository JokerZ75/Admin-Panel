import React, { FC, useEffect, useRef, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDarkMode } from "../lib/context/darkModeContext";
import { url } from "inspector";
import { useSignOut, useIsAuthenticated, createRefresh } from 'react-auth-kit';
import axios from "axios";


const Navbar: FC = () => {
  const { setDarkMode, darkMode } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(window.location.pathname);
  const navbar = useRef<HTMLDivElement>(null);
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

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
          <button
            onClick={() => setDarkMode(!darkMode)}
            id="theme-toggle"
            className="link"
          >
            <h1 className="link-text">
              {darkMode == true ? <FaSun /> : <FaMoon />}
            </h1>
          </button>
        </div>
        <nav id="navbar" ref={navbar}>
          <Link className="link" to={"/dashboard"}>
            <h1 className="link-text">Dashboard</h1>
          </Link>
          <Link className="link" to={"/orders"}>
            <h1 className="link-text">Orders</h1>
          </Link>
          <Link className="link" to={"/profile"}>
            <h1 className="link-text">Profile</h1>
          </Link>
          {isAuthenticated() && (
            <Link
              className="link"
              to={"/"}
              onClick={() => {
                signOut();
              }}
            >
              <h1 className="link-text">Logout</h1>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};
export default Navbar;
