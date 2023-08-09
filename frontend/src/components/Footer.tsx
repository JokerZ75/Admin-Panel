import React, { FC } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <>
      <div id="footer">
        <div id="about">
          <h3 className="footer-heading">About</h3>
          <p className="footer-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            libero consequatur et molestiae odit.
          </p>
        </div>
        <div id="contact">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            libero consequatur et molestiae odit.
          </p>
        </div>
        <div id="social">
          <h3 className="footer-heading">Socials</h3>
          <div className="social-icons">
            <Link className="social-icon" to="https://www.instagram.com/">
              <FaInstagram />
            </Link>
            <Link className="social-icon" to="https://www.facebook.com/">
              <FaFacebook  />
            </Link>
            <Link className="social-icon" to="https://www.twitter.com/">
              <FaTwitter  />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
