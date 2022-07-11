import "./navBar.css";
import React from "react";

const NavBar = ({ title, backgroundColor, textColor, topFixed }) => {
  return (
    <div
      className="navBar"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        top: topFixed ? 0 : "none",
        position: topFixed ? "fixed" : "static",
      }}
    >
      <div className="title">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default NavBar;
