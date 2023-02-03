/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./myColors.css";
import React from "react";
import ColorInput from "../colorInput/colorInput";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';
import { numberOfColors } from "../../variables";

const MyColors = ({ colorList, setColorList, direction, setDirection }) => {
  const { t } = useTranslation();
  
  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  const updateColorValue = (index, newValue) => {
    setColorList((colors) =>
      colors.map((value, i) => (i === index ? newValue : value))
    );
  };

  /** Legg til farge hvis vi ikke har nådd maks antall */
  const addColorValue = () => {
    if(colorList.length >= 0 && colorList.length < numberOfColors.MAX)
    setColorList((colorList) => [...colorList, getColorsFromDefaultPalette(1, colorList)[0]])
  }

  /** Fjern farge hvis det er flere enn minimum antall */
  const removeColorValue = (index) => {
    setColorList((colorList) =>
      colorList.filter((_, i) => i !== index.index || colorList.length === numberOfColors.MIN)
    );
  };

  /** Fjern farge hvis det er flere enn minimum antall */
  const clearColorValues = () => {
    setColorList((colorList) => getColorsFromDefaultPalette(0, 0));
  };

  return (
    <div className="adaptive-bar"  aria-label={t('my-colors-heading')}>
      <div className="color-bar-heading">
        {t('my-colors-heading')}
      </div>
      <ul className="adaptive-color-list">
        <li className={`my-color-list-item empty-message ${colorList.length > 0 ? "disabled-message" : ""}`}>
          TOM PALETT
        </li>
        <li className="my-color-list-item dummy-item">
          <ColorInput/>
        </li>
        {Object.values(colorList).map((color, index) => (
          <li className="my-color-list-item">
            <ColorInput
              key={"color" + index}
              index={index}
              colorValue={color}
              updateColorValue={updateColorValue}
              removeColorValue={removeColorValue}
            ></ColorInput>
          </li>
        ))}
      </ul>
      <ul className="color-list-controls">
        <button 
          disabled={colorList.length === numberOfColors.MAX ? true : false } 
          className="palette-button palette-add"
          onClick={addColorValue}
        >🞥</button>
        <div className="color-list-control-separator"/>
        <button 
          disabled={colorList.length === 0 ? true : false } 
          className="palette-button palette-clear"
          onClick={clearColorValues}
        >🗑 </button>
      </ul>
    </div>
  );
};

export default MyColors;
