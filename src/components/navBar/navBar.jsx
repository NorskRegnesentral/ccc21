import "./navBar.css";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="title">
        <h1>Kontrastsjekker</h1>
      </div>
      <ul className="mainMenu">
        <li>
          <p>Meny (kommer)</p>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
