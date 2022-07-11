import "./contrastSummary.css";
import React, { useState, useEffect } from "react";
import { getContrastList } from "../../contrast-calculations";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

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



  const [contrastColors] = useState({
    none: "#ee8181",
    AANontext: "#f7b87d",
    AA: "#ecdb79",
    AAA: "#cff7cf",
  }); //endre her hvis andre farger er ønskelig!


  useEffect(() => {
    setBadContrasts("");
    setBadContrasts(getContrastList(contrastMatrix, 1.0, 3.0));
    setAANontextContrasts(getContrastList(contrastMatrix, 3.0, 4.5)); //https://www.uutilsynet.no/wcag-standarden/1411-kontrast-ikke-tekstlig-innhold-niva-aa/145
    setAAContrasts(getContrastList(contrastMatrix, 4.5, 7));
    setAAAContrasts(getContrastList(contrastMatrix, 7, 21.0));
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
