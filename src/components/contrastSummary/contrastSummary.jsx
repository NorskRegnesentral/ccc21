import "./contrastSummary.css";
import React, { useState, useEffect } from "react";
import { getContrastList } from "../../contrast-calculations";

const ContrastSummary = ({ contrastMatrix }) => {
  const [contrastColors] = useState({
    none: "#F2B8B8",
    AA: "#F2E9B8",
    AAA: "#B7F1B8",
  }); //endre her hvis andre farger er ønskelig!

  const [AAAContrasts, setAAAContrasts] = useState(
    getContrastList(contrastMatrix, 4.51, 21)
  );
  const [AAContrasts, setAAContrasts] = useState(
    getContrastList(contrastMatrix, 1.01, 4.5)
  );
  const [badContrasts, setBadContrasts] = useState(
    getContrastList(contrastMatrix, 1, 1)
  );

  useEffect(() => {
    setBadContrasts("");
    setBadContrasts(getContrastList(contrastMatrix, 1.0, 4.5));
    setAAContrasts(getContrastList(contrastMatrix, 4.5, 7));
    setAAAContrasts(getContrastList(contrastMatrix, 7, 21.0));
  }, [contrastMatrix]);

  return (
    <div className="contrastTable">
      <h1>Kontrastoppsummering </h1>
      <h3>Super kombinasjon</h3>
      <ul>
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
            {item.kontrastverdi}
          </li>
        ))}
      </ul>

      <h3>Ok kombinasjon</h3>
      <ul>
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
            {item.kontrastverdi}
            {console.log(item)}
          </li>
        ))}
      </ul>

      <h3>Dårlige kombinasjoner</h3>
      <ul>
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
            {item.kontrastverdi}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContrastSummary;
