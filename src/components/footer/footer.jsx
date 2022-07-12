import "./footer.css";
import React, { useState, useEffect } from "react";

const Footer = ({ backgroundColor, textColor, text }) => {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <p>{text}</p>
    </div>
  );
};

export default Footer;
