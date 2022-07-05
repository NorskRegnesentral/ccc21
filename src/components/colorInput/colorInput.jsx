import "./colorInput.css";
import React, { useState, useEffect } from "react";

const ColorInput = ({
  colorValue,
  index,
  updateColorValue,
  removeColorValue,
}) => {
  const [colorTextInput, setColorTextInput] = useState();
  useEffect(() => {}, []);

  useEffect(() => {
    setColorTextInput(colorValue);
  }, [colorValue]);

  let updateValue = (e) => {
    setColorTextInput(e.target.value);
    var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    //sjekker om det er syv karakterer (nok til en hex) og oppdaterer hvis hexkoden finnes.
    //hvis ikke setter vi verdien tilbake til det den var sist.
    if (e.target.value.length === 7 && RegExp.test(e.target.value))
      updateColorValue(index, e.target.value);
    if (e.target.value.length === 7 && !RegExp.test(e.target.value))
      setColorTextInput(colorValue);
  };

  return (
    <div className="colorInput">
      <button
        className="deleteInput"
        title="fjern inputboks"
        onClick={(e) => {
          {
            removeColorValue({ index });
          }
        }}
      >
        x
      </button>
      <input
        type="color"
        value={colorValue}
        onInput={(e) => {
          {
            updateColorValue(index, e.target.value);
          }
        }}
      ></input>
      <input
        type="text"
        id="hex-input"
        maxLength="7"
        value={colorTextInput}
        onChange={updateValue}
      ></input>
    </div>
  );
};

export default ColorInput;
