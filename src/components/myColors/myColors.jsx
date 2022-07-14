import "./myColors.css";
import React, { useState, useEffect } from "react";
import ColorInput from "../colorInput/colorInput";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';

const MyColors = ({ colorList, setColorList }) => {
  const { t } = useTranslation();
  
  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  const updateColorValue = (index, newValue) => {
    setColorList((colors) =>
      colors.map((value, i) => (i === index ? newValue : value))
    );
  };

  const addColorValue = () => {
    console.log("sender inn lista nå", colorList)
    if(colorList.length < 8)
    setColorList((colorList) => [...colorList, getColorsFromDefaultPalette(1, colorList)[0]])
  }

  const removeColorValue = (index) => {
    setColorList((colorList) =>
      colorList.filter((_, i) => i !== index.index || colorList.length === 2)
    );
  };


  return (
    <div className="myColors"  aria-label={t('my-colors-heading')}>
      <ul className="my-color-list">
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
      <div className="button">
        <button className="addColorButton"
          onClick={addColorValue}
        >
          {t('add-color')}
        </button>
      </div>
    </div>
  );
};

export default MyColors;
