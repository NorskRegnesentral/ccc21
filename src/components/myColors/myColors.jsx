/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./myColors.css";
import React from "react";
import ColorInput from "../colorInput/colorInput";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';
import { numberOfColors } from "../../variables";
import FilteredColor from "../../FilteredColor";

const MyColors = ({ colorList, setColorList, direction, setDirection, filterType }) => {
  const { t } = useTranslation();

  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  const updateColorValue = (index, newOriginalValue, filterType, originalText) => {
    let newFilteredColor = new FilteredColor(newOriginalValue, filterType, originalText);
    setColorList((colors) =>
      colors.map((value, i) => (i === index ? newFilteredColor : value))
    );
  };

  /** Legg til farge hvis vi ikke har nådd maks antall */
  const addColorValue = () => {
    if(colorList.length >= 0 && colorList.length < numberOfColors.MAX)
      setColorList((colorList) => [...colorList, getColorsFromDefaultPalette(1, colorList, filterType)[0]])
  }

  /** Fjern farge hvis det er flere enn minimum antall */
  const removeColorValue = (index) => {
    setColorList((colorList) =>
      colorList.filter((_, i) => i !== index.index || colorList.length === numberOfColors.MIN)
    );
  };

  /** Fjern farge hvis det er flere enn minimum antall */
  const clearColorValues = () => {
    setColorList((colorList) => getColorsFromDefaultPalette(0, 0, filterType));
  };

  return (
    <div className="adaptive-bar">
      <h1 className="big-title">
        {t('my-colors-heading')}
      </h1>
      <ul className="color-list-controls">
        <button 
          disabled={colorList.length === numberOfColors.MAX ? true : false } 
          className="palette-button palette-add"
          onClick={addColorValue}
	  aria-label={t('add-color')}
        >🞥</button>
        <button 
          disabled={colorList.length === 0 ? true : false } 
          className="palette-button palette-clear"
          onClick={clearColorValues}
	  aria-label={t('clear-palette')}
        >🗑 </button>
      </ul>
      <ul className="adaptive-color-list">
        <li className={`my-color-list-item ${colorList.length > 0 ? "disabled-message" : "enabled-message"}`}>
          <div className="empty-message">{t('my-colors-empty')}</div>
          <div className="dummy-item">
            <ColorInput/>
          </div>
        </li>
        {Object.values(colorList).map((color, index) => (
          <li className="my-color-list-item" key={"my-color-list-item-" + index}>
            <ColorInput
              key={"color" + index}
              index={index}
              originalColorValue={color.original}
              filteredColorValue={color.filtered}
              originalColorText={color.originalText}
              updateColorValue={updateColorValue}
              removeColorValue={removeColorValue}
              filterType={filterType}
            ></ColorInput>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyColors;
