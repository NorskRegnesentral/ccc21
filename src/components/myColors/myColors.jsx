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
    <div className="myColors">
      <div className="headingAndButton">
        <button className="addColorButton"
          onClick={addColorValue}
        >
          {t('add-color')}
        </button>
      </div>
      <div>
        <div className="inputFields">
          {Object.values(colorList).map((color, index) => (
            <ColorInput
              key={"color" + index}
              index={index}
              colorValue={color}
              updateColorValue={updateColorValue}
              removeColorValue={removeColorValue}
            ></ColorInput>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyColors;
