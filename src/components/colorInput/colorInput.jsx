import "./colorInput.css";
import React, { useState, useEffect } from "react";

const ColorInput = (colorValue) => {
  console.log("val", colorValue);

  return (
    <div className="colorInput">
      <input type="color" value={colorValue.colorValue}></input>
    </div>
  );
};

export default ColorInput;
