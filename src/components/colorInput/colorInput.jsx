import "./colorInput.css";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const ColorInput = ({
  colorValue,
  index,
  updateColorValue,
  removeColorValue,
}) => {
  const { t } = useTranslation();
  const [colorTextInput, setColorTextInput] = useState();
  useEffect(() => {
    setColorTextInput(colorValue);
  }, [colorValue]);

  //sjekker om det er syv karakterer (nok til en hex) og oppdaterer hvis hexkoden finnes.
  //hvis ikke setter vi verdien tilbake til det den var sist.
  let updateValue = (e) => {
    setColorTextInput(e.target.value);
    var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    if (e.target.value.length === 7 && RegExp.test(e.target.value))
      updateColorValue(index, e.target.value);
    if (e.target.value.length === 7 && !RegExp.test(e.target.value))
      setColorTextInput(colorValue);
  };

  return (
    <div className="colorInput">
      <button
        className="deleteInput"
        title={t('input-delete')}
        onClick={(e) => {
          {
            removeColorValue({ index });
          }
        }}
      >
        x
      </button>
      <input
        className="inputForColor"
        type="color"
        value={colorValue}
        onInput={(e) => {
          {
            updateColorValue(index, e.target.value);
          }
        }}
      ></input>
      <input
        className="inputForColor"
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
