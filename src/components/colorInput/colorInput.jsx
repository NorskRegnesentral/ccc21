/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./colorInput.css";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const ColorInput = ({
  colorValue,
  index,
  updateColorValue,
  removeColorValue,
}) => {
  const validMark = "✔";
  const invalidMark = "✘";
  const validClass = "hex-input-validation-indicator hex-input-valid";
  const invalidClass = "hex-input-validation-indicator hex-input-invalid";
  
  const { t } = useTranslation();
  const [colorTextInput, setColorTextInput] = useState();
  const [syntaxValidationMark, setSyntaxValidationMark] = useState();
  const [syntaxValidationClass, setSyntaxValidationClass] = useState();
  useEffect(() => {
    setColorTextInput(colorValue);
    setSyntaxValidationMark(validMark);
    setSyntaxValidationClass(validClass);
  }, []);

  let convertHexColor3To6 = (e) => {
    let s = "#";
    for (let i = 1; i < 4; i++) {
      s += e[i];
      s += e[i];
    }
    return s;
  }

  let updateValue = (e) => {
    setColorTextInput(e.target.value);
    var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    if (RegExp.test(e.target.value)) {
      if (e.target.value.length == 7) {
        updateColorValue(index, e.target.value);
      } else {
        updateColorValue(index, convertHexColor3To6(e.target.value));
      }
      setSyntaxValidationMark(validMark);
      setSyntaxValidationClass(validClass);
    } else {
      setSyntaxValidationMark(invalidMark);
      setSyntaxValidationClass(invalidClass);
    }
  };

  return (
    <fieldset className="colorInput">
      <legend hidden>{colorValue}</legend>
      <label htmlFor={'color-value-by-colorpicker-'+index} hidden> {"color from chooser box"} </label> 
      <input
          className="inputForColor"
          id={'color-value-by-colorpicker-'+index} 
          type="color"
          value={colorValue}
        onInput={(e) => {{ updateColorValue(index, e.target.value); updateValue(e); }}}
        ></input>
      <label htmlFor={'color-value-by-text-'+index} hidden> {"color as text input"} </label>
      <div className="hex-input-frame">
        <input
          className="inputForColor hex-input"
          type="text"
          id={'color-value-by-text-'+index}
          maxLength="7"
          value={colorTextInput || ""}
          onChange={updateValue}
        ></input>
        <div className={syntaxValidationClass}>
          {syntaxValidationMark}
        </div>
      </div>
      <button
        className="deleteInput"
        value="delete color"
        title={t('input-delete')}
        onClick={(e) => {{ removeColorValue({ index }) }}}> 
          ×
      </button>
    </fieldset>
  );
};

export default ColorInput;
