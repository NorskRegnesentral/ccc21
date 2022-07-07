import "./contrastSummary.css";
import React, { useState, useEffect } from "react";
import { getContrastList } from "../../contrast-calculations";

const ContrastSummary = ({ contrastMatrix }) => {
  const [AAAContrasts, setAAAContrasts] = useState(
    getContrastList(contrastMatrix, 4.51, 21)
  );
  const [AAContrasts, setAAContrasts] = useState(
    getContrastList(contrastMatrix, 1.01, 4.5)
  );
  const [AANontextContrasts, setAANontextContrasts] = useState(
    getContrastList(contrastMatrix, 1.01, 4.5)
  );
  const [badContrasts, setBadContrasts] = useState(
    getContrastList(contrastMatrix, 1, 1)
  );

  useEffect(() => {
    setBadContrasts("");
    setBadContrasts(getContrastList(contrastMatrix, 1.0, 3.0));
    setAANontextContrasts(getContrastList(contrastMatrix, 3.0, 4.5)); //https://www.uutilsynet.no/wcag-standarden/1411-kontrast-ikke-tekstlig-innhold-niva-aa/145
    setAAContrasts(getContrastList(contrastMatrix, 4.5, 7));
    setAAAContrasts(getContrastList(contrastMatrix, 7, 21.0));
  }, [contrastMatrix]);

  return (
    <div className="contrastSummary">
      <h1>Oppsummering av kombinasjoner </h1>
      <h3 className="contrastSummaryHeading">Wcag AAA for tekst</h3>
      <ul className="contrastSummaryList">
        {Object.values(AAAContrasts).map((item, index) => (
          <li key={"AA" + index}>
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
            {/*item.kontrastverdi*/}
          </li>
        ))}
      </ul>

      <h3 className="contrastSummaryHeading">Wcag AA for tekst</h3>
      <ul className="contrastSummaryList">
        {Object.values(AAContrasts).map((item, index) => (
          <li key={"AAA" + index}>
             <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
            {/*item.kontrastverdi*/}
          </li>
        ))}
      </ul>

      <h3 className="contrastSummaryHeading">Wcag AA for ikke-tekstlig innhold</h3>
      <ul className="contrastSummaryList">
        {Object.values(AANontextContrasts).map((item, index) => (
          <li key={"AANontext" + index}>
             <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
            {/*item.kontrastverdi*/}
          </li>
        ))}
      </ul>

      <h3 className="contrastSummaryHeading">Kontrast under 3</h3>
      <ul className="contrastSummaryList">
        {Object.values(badContrasts).map((item, index) => (
          <li key={"bad" + index}>
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
            {/*item.kontrastverdi*/}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContrastSummary;
