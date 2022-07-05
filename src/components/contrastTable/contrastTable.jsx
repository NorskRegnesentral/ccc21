import "./contrastTable.css";
import React, { useState } from "react";

const ContrastTable = ({ contrastMatrix }) => {
  const [contrastColors] = useState({
    none: "#F2B8B8",
    AA: "#F2E9B8",
    AAA: "#B7F1B8",
  }); //endre her hvis andre farger er ønskelig!

  //Sjekker om verdien er en hex og returnerer fargen hvis ja
  const getColorIfHex = (possibleHex) => {
    const RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    return possibleHex.length === 7 && RegExp.test(possibleHex)
      ? possibleHex
      : "";
  };

  //Sjekker om verdien er kontrast, og returnerer evt passende farge etter oppfylte krav
  const getCellColorFromContrast = (possibleContrast) => {
    return possibleContrast >= 1 && possibleContrast <= 21 //kontraster er et tall mellom 1-21
      ? possibleContrast < 4.5
        ? contrastColors.none
        : 4.5 <= possibleContrast && possibleContrast < 7.0
        ? contrastColors.AA
        : contrastColors.AAA
      : "";
  };

  return (
    <div className="contrastTable">
      <h1>Tabellvisning</h1>
      <table>
        <tbody>
          {contrastMatrix.map((row, rowIndex) => (
            <tr key={"row" + rowIndex}>
              {Object.values(row).map((rowItem, colIndex) => (
                <td
                  key={"row" + rowIndex + "col" + colIndex}
                  style={{ backgroundColor: getCellColorFromContrast(rowItem) }}
                >
                  <div
                    style={{ backgroundColor: getColorIfHex(rowItem) }}
                    className="colorBox"
                  />
                  <div>{rowItem}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ContrastTable;
