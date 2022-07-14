import "./textBox.css";
import React from "react";

const TextBox = ({ title, titleIcon, backgroundColor, textColor, mainText }) => {
  return (
    <div
      className="textBox"
      style={{
        backgroundColor: backgroundColor,
        color: textColor
      }}
    >
      <div className="title">
        <div>{titleIcon}</div>
        <h2 className="h1-text-box">{title}</h2>
      </div>
      <div>
        <p className="p-text-box">{mainText}</p>
      </div>
    </div>
  );
};

export default TextBox;
