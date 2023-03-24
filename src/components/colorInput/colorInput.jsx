/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./colorInput.css";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const ColorInput = ({
  originalColorValue,
  filteredColorValue,
  originalColorText,
  index,
  updateColorValue,
  removeColorValue,
  filterType
}) => {

  const validMark = "✔";
  const invalidMark = "✘";
  const validClass = "hex-input-validation-indicator hex-input-valid";
  const invalidClass = "hex-input-validation-indicator hex-input-invalid";
  
  const { t } = useTranslation();
  const [colorTextInput, setColorTextInput] = useState("");
  const [syntaxValidationMark, setSyntaxValidationMark] = useState();
  const [syntaxValidationClass, setSyntaxValidationClass] = useState();
  useEffect(() => {
    setColorTextInput(originalColorText);
    setSyntaxValidationMark(validMark);
    setSyntaxValidationClass(validClass);
  }, [originalColorText]);

  let convertHexColor3To6 = (e) => {
    let s = "#";
    for (let i = 1; i < 4; i++) {
      s += e[i];
      s += e[i];
    }
    return s;
  }
  
  let isValidHexColor = (s) => {
    var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    return RegExp.test(s);
  }
  
  let updateValue = (e) => {
    setColorTextInput(e.target.value);
    if (isValidHexColor(e.target.value)) {
      let originalValue = e.target.value.length == 7 ? e.target.value : convertHexColor3To6(e.target.value);
      updateColorValue(index, originalValue, filterType, e.target.value);
      setSyntaxValidationMark(validMark);
      setSyntaxValidationClass(validClass);
    } else {
      setSyntaxValidationMark(invalidMark);
      setSyntaxValidationClass(invalidClass);
    }
  };

  return (
    <fieldset className="colorInput">
      <legend hidden>{originalColorValue}</legend>
      <label htmlFor={'color-value-by-colorpicker-'+index} hidden> {"color from chooser box"} </label> 
      <input
          className="inputForColor"
          id={'color-value-by-colorpicker-'+index} 
          type="color"
        value={originalColorValue}
        onInput={(e) => {{ updateValue(e); }}}
      ></input>
      <div class={ filterType === "none" ? "no-filtered-color-patch" : "filtered-color-patch"} style={{backgroundColor: filteredColorValue}}>
      </div>
      <label htmlFor={'color-value-by-text-'+index} hidden> {"color as text input"} </label>
      <div className="hex-input-frame">
        <input
          className="inputForColor hex-input"
          type="text"
          id={'color-value-by-text-'+index}
          maxLength="7"
          value={colorTextInput}
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
