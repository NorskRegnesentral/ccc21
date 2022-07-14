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
    <div className="contrastTable" aria-describedby={t('contrast-table-title')}>
        <fieldset className="tableHeader">
          <legend hidden>{t('contrast-table-radiobutton-title')}</legend>
          <label for={t('view-contrast-level-by-color')} onClick={()=>setColorsInTable(false)}>
            <input type="radio" className="radio-button" checked={colorsInTable ? false : true} name={t('view-contrast-level-by-color')}/>
            {t('view-contrast-level-by-color')}
          </label>
          <label for={t('view-chosen-colors')}  onClick={()=>setColorsInTable(true)}>
            <input type="radio"  className="radio-button"  checked={colorsInTable ? true : false} name={t('view-chosen-colors')}/>
            {t('view-chosen-colors')}
          </label>       
        </fieldset> 
      <div className="tableBody">
        <table>
          <tbody>
            {contrastMatrix.map((row, rowIndex) => (
              <tr key={"row" + rowIndex}>
                {Object.values(row).map((rowItem, colIndex) => (
                  <td
                    key={"row" + rowIndex + "col" + colIndex}
                    style={{ backgroundColor: colorsInTable && colIndex != 0 && rowIndex != colIndex ? getRowColor(rowIndex, colIndex, rowItem) : getCellColorFromContrast(rowItem) }}
                  >
                    <div
                      style={{ backgroundColor: isHex ? rowItem : "" }}
                      className="colorBox"
                    />
                    <p className="tableText"  style={{ color: colorsInTable && rowIndex != 0 ?  getColumnColor(rowIndex, colIndex, rowItem) : "#000000" }}>{rowItem}</p> 
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
