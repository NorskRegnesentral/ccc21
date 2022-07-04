import "./colorInput.css";
import React, { useState, useEffect } from "react";

const ColorInput = ({colorValue, index, updateColorValue, removeColorValue}) => {
  const [colorTextInput, setColorTextInput] = useState();
  useEffect(() => {},[]);


  useEffect(() => {
    setColorTextInput(colorValue);
  },[colorValue]);

  let updateValue = (e) => {
    setColorTextInput(e.target.value)
    console.log("might update color value to", e.target.value.length)
    var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    if(e.target.value.length === 7 && RegExp.test(e.target.value)) updateColorValue(index, e.target.value)
    if(e.target.value.length === 7 && !RegExp.test(e.target.value)) setColorTextInput(colorValue)
  }

  return (
    <div className="colorInput">
      <input type="color" value={colorValue} 
      onInput={e => {
        {updateColorValue(index, e.target.value)}
    }}
      ></input>
      <input type="text" id="hex-input" maxLength="7" value={colorTextInput} onChange={updateValue}></input>
      <button className="deleteInput" onClick={e => {{removeColorValue({index})}}}>x fjern</button>
    </div>
  );
};

export default ColorInput;
