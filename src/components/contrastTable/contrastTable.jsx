import "./contrastTable.css";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { contrastColors, wcagRules as w } from "../../varialbes";

const ContrastTable = ({ contrastMatrix }) => {
  const { t } = useTranslation();
  const [colorsInTable, setColorsInTable] = useState(false); 

  //Sjekker om verdien er en hex og returnerer fargen hvis ja
  const isHex = (possibleHex) => {
    const RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    return possibleHex.length === 7 && RegExp.test(possibleHex)
      ? true
      : false;
  };

  //Sjekker om verdien er kontrast, og returnerer evt passende farge etter oppfylte krav
  const getCellColorFromContrast = (possibleContrast) => {
    return possibleContrast >= w.contrastMin && possibleContrast <= w.contrastMax  //kontraster er et tall mellom 1-21
      ? possibleContrast < w.lowContrastMax
        ? contrastColors.none
        : w.aaNonTextMin <= possibleContrast && possibleContrast < w.aaNonTextMax
        ? contrastColors.AANontext :
        w.aaTextMin <= possibleContrast && possibleContrast < w.aaTextMax
        ? contrastColors.AA
        : contrastColors.AAA
      : "";
  };

  const getRowColor = (rowIndex, colIndex, rowItem) => {
    if(1 <= rowItem <= 21) return contrastMatrix[0][rowIndex]
    else return "";
  }

  const getColumnColor = (rowIndex, colIndex, rowItem) => {
    return contrastMatrix[colIndex][0];
  }

  return (
    <div className="contrastTable">
        <fieldset className="tableHeader">
          <legend hidden>{t('contrast-table-radiobutton-title')}</legend>
          <div className="radio-button-container" onClick={()=>setColorsInTable(false)}>
            <label for={t('view-contrast-level-by-color')}>
              {t('view-contrast-level-by-color')}
            </label>
            <input type="radio" className="radio-button" checked={colorsInTable ? false : true} id={t('view-contrast-level-by-color')}/>
            </div>
            <div className="radio-button-container" onClick={()=>setColorsInTable(true)}>
              <label for={t('view-chosen-colors')}>
              {t('view-chosen-colors')}
              </label>
              <input type="radio"  className="radio-button"  checked={colorsInTable ? true : false} id={t('view-chosen-colors')}/>   
            </div>    
        </fieldset> 
      <div className="tableBody">
        <table>
          <tbody>
            {contrastMatrix.map((row, rowIndex) => (
              <tr key={"row" + rowIndex}>
                {Object.values(row).map((rowItem, colIndex) => (
                  rowIndex == 0 || colIndex == 0 ? 
                  <th key={"row" + rowIndex + "col" + colIndex}>
                    <div style={{ backgroundColor: rowItem }} className="colorBox"/>
                    <p className="table-text-header">{rowItem}</p> 
                  </th>
                  :
                  <td
                    key={"row" + rowIndex + "col" + colIndex}
                    style={{ backgroundColor: colorsInTable && rowIndex !== colIndex ? getRowColor(rowIndex, colIndex, rowItem) : getCellColorFromContrast(rowItem) }}
                  >
                    <p className="table-text-entry"  style={{ color: colorsInTable ?  getColumnColor(rowIndex, colIndex, rowItem) : "#000000" }}>{rowItem}</p> 
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ContrastTable;
