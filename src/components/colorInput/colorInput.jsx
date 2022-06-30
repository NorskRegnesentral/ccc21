import "./colorInput.css";
import React, { useState, useEffect } from "react";

const ColorInput = ({colorValue, index, updateColorValue}) => {

  useEffect(() => {
    console.log("color to show,", colorValue)
  },[]);

  return (
    <div className="colorInput">
      <input type="color" value={colorValue.colorValue} 
      onInput={e => {
        console.log("new color?", e.target.value);
        {updateColorValue(index, e.target.value)}
    }}
      ></input>
      <p>{colorValue}</p>
    </div>
  );
};

export default ColorInput;
