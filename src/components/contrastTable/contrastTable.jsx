/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./contrastTable.css";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { contrastColors, wcagRules as w } from "../../variables";

const ContrastTable = ({ contrastMatrix }) => {
  const { t } = useTranslation();
  const [textMode, setTextMode] = useState(true); 

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

  const getWcagRatingFromContrast = (possibleContrast, textMode) => {
    if (textMode) {
      if (possibleContrast >= w.aaaTextMin) {
        return "AAA";
      } else if (possibleContrast >= w.aaTextMin) {
        return "AA";
      } else {
        return "";
      }
    } else {
      if (possibleContrast >= w.aaNonTextMin) {
        return "AA";
      } else {
        return "";
      }
    }
  };

  const getRowColor = (rowIndex, colIndex, rowItem) => {
    if(1 <= rowItem <= 21) return contrastMatrix[0][rowIndex]
    else return "";
  }

  const getColumnColor = (rowIndex, colIndex, rowItem) => {
    return contrastMatrix[colIndex][0];
  }

  return (
    contrastMatrix.length > 2 ?
      <div className="contrastTable">
        <fieldset className="tableHeader">
          <legend hidden>{t('contrast-table-radiobutton-title')}</legend>
          {t('view-wcag-level')}
          <div className="radio-button-container">
            <label htmlFor="text">
              {t('view-wcag-level-text')}
            </label>
            <input type="radio"  className="radio-button" checked={textMode ? true : false} onChange={()=>setTextMode(true)} id="text"/>
          </div>    
          <div className="radio-button-container">
            <label htmlFor="nontext">
              {t('view-wcag-level-non-text')}
            </label>
            <input type="radio" className="radio-button" checked={textMode ? false : true} onChange={()=>setTextMode(false)} id="nontext"/>
          </div>
        </fieldset>
        <div className="tableBody">
      <table aria-describedby="contrastTableDescr">
            <tbody>
              {contrastMatrix.map((row, rowIndex) => (
                <tr key={"row" + rowIndex}>
                  {Object.values(row).map((rowItem, colIndex) => (
                    rowIndex == 0 || colIndex == 0 ? 
                      <th scope={!rowIndex && colIndex ? "col" : (!colIndex && rowIndex ? "row" : "")} key={"row" + rowIndex + "col" + colIndex}>
                          <div style={{ backgroundColor: rowItem.filtered }} className={rowIndex > 0 || colIndex > 0 ? "colorBox" : ""}/>
                              <span className="table-text-header">{rowItem.original}</span> 
			</th>
			:
			<td key={"row" + rowIndex + "col" + colIndex}>
			    <span className={rowIndex !== colIndex ? "table-color-patch" : "table-color-blank"}
				   style={{ color: getColumnColor(rowIndex, colIndex, rowItem).filtered,
					    backgroundColor: rowIndex !== colIndex ? getRowColor(rowIndex, colIndex, rowItem).filtered : "transparent" }} aria-hidden="true">
				    {rowIndex !== colIndex ? (textMode ? t('contrast-table-example') : "▄▄▛▀") : ""}
			      </span>
			      <div className="table-rating">
				  <span className="table-rating-contrast">{rowItem}</span> 
				    <span className={getWcagRatingFromContrast(rowItem, textMode) ? "table-rating-wcag" : ""}>{getWcagRatingFromContrast(rowItem, textMode)}</span> 
				</div>
			  </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    :
      <p>{t('contrast-table-empty')}</p>
  );
};
export default ContrastTable;
