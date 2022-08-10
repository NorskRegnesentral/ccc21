//SPDX-License-Identifier: GPL-3.0-or-later
import "./navBar.css";
import React from "react";

const NavBar = ({ title, titleIcon, backgroundColor, textColor }) => {
  return (
    <div
      className="navBar"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        position: "static",
      }}
    >
      <div className="title">
        <div className="title">{titleIcon}</div>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default NavBar;
