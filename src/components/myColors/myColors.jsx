/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./myColors.css";
import React from "react";
import ColorInput from "../colorInput/colorInput";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';
import { colorBarFormats, numberOfColors } from "../../variables";
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';

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

  /** Dette er endring mellom å ha farge-baren på toppen av siden (horizontal) 
   * eller til venstre (vertical). 
   */
  const changeFormat = () => {
    setDirection(direction === colorBarFormats.VERTICAL ? colorBarFormats.HORIZONTAL : colorBarFormats.VERTICAL)
  }

  return (
    <div className={direction === colorBarFormats.VERTICAL ? "vertical-bar" : "horizontal-bar"}  aria-label={t('my-colors-heading')}>
      <button className="toggle-button" onClick={changeFormat}><PivotTableChartIcon/> <p className="hide-text">{t('change-color-menu-direction')}</p> </button>
      <ul className={direction === colorBarFormats.VERTICAL ?  "vertical-color-list" :  "horizontal-color-list"}>
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
        <button 
          disabled={colorList.length === numberOfColors.MAX ? true : false } 
          className="addColorButton"
          onClick={addColorValue}
        >
          {t('add-color')}
        </button>
    </div>
  );
};

export default MyColors;
