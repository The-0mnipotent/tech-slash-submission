import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>For <b>SlashHash Assignment</b> from <a href="https://arpit-singh.netlify.app/" target="_blank">Arpit Singh</a></span>
      <span>
        Made with ♥️ and <b>MySql, Express, React.js & Node.js</b>.
      </span>
    </footer>
  );
};

export default Footer;