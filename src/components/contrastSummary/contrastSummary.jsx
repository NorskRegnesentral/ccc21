import "./contrastSummary.css";
import React, { useState, useEffect } from "react";
import { getContrastList } from "../../contrast-calculations";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { contrastColors } from "../../varialbes";
import { wcagRules as w } from "../../varialbes";

const ContrastSummary = ({ contrastMatrix }) => {
  const { t } = useTranslation();
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
    setBadContrasts(getContrastList(contrastMatrix, w.contrastMin, w.lowContrastMax));
    setAANontextContrasts(getContrastList(contrastMatrix, w.aaNonTextMin, w.aaNonTextMax)); //https://www.uutilsynet.no/wcag-standarden/1411-kontrast-ikke-tekstlig-innhold-niva-aa/145
    setAAContrasts(getContrastList(contrastMatrix, w.aaTextMin, w.aaTextMax));
    setAAAContrasts(getContrastList(contrastMatrix, w.aaaTextMin, w.contrastMax));
  }, [contrastMatrix]);

  return (
    <div className="contrastSummary">
       <h1>{t('contrast-summary-heading')} </h1>

      <div>
      <div className="contrastSummaryHeading"  style={{ backgroundColor: contrastColors.AAA, borderRadius: "4px", padding:"2px"}}>
        <TextFieldsIcon/>
        <h3 className="contrastSummaryHeadingFont">{t('contrast-summary-aaa')}</h3>
      </div>
      <ul className="contrastSummaryList">
        {Object.values(AAAContrasts).map((item, index) => (
          <li key={"AA" + index} className="contrastSummaryListItem">
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
          </li>
        ))}
      </ul>
      </div>

      <div className="contrastSummaryHeading" style={{ backgroundColor: contrastColors.AA, borderRadius: "4px", padding:"2px"}}>
        <TextFieldsIcon/>
        <h3 className="contrastSummaryHeadingFont">{t('contrast-summary-aa')}</h3>
      </div>
      <ul className="contrastSummaryList">
        {Object.values(AAContrasts).map((item, index) => (
          <li key={"AAA" + index} className="contrastSummaryListItem">
             <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
          </li>
        ))}
      </ul>

      <div className="contrastSummaryHeading"  style={{ backgroundColor: contrastColors.AANontext, borderRadius: "4px", padding:"2px"}}>
        <AutoAwesomeMosaicIcon aria-label="tekst-ikon"/>
        <h3 className="contrastSummaryHeadingFont">{t('contrast-summary-nontext-aa')}</h3>
      </div>
      <ul className="contrastSummaryList">
        {Object.values(AANontextContrasts).map((item, index) => (
          <li key={"AANontext" + index} className="contrastSummaryListItem">
             <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
          </li>
        ))}
      </ul>

      <div>
      <div className="contrastSummaryHeading"  style={{ backgroundColor: contrastColors.none, borderRadius: "4px", padding:"2px"}}>
        <VisibilityOffIcon />
        <h3 className="contrastSummaryHeadingFont">{t('contrast-summary-low')}</h3>
      </div>
      <ul className="contrastSummaryList">
        {Object.values(badContrasts).map((item, index) => (
          <li className="contrastSummaryListItem" key={"bad" + index}>
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge1 }}
            />
            <div
              className="colorBox"
              style={{ backgroundColor: item.farge2 }}
            />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};
export default ContrastSummary;
