// SPDX-License-Identifier: GPL-3.0-or-later
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import ContrastTable from "../../components/contrastTable/contrastTable";
import MockupTextBox from "../../components/mockupTextBox/mockupTextBox";
import MockupIllustration from "../../components/mockupIllustration/mockupIllustration"
import MyColors from "../../components/myColors/myColors";
import MockupGraph from "../../components/mockupGraph/mockupGraph";
import Footer from "../../components/footer/footer";
import TextBox from "../../components/textBox/textBox";
import { checkColors } from "../../color-checker";
import { getColorsFromDefaultPalette, getContrastList  } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import HandymanIcon from '@mui/icons-material/Handyman';
import { contrastColors, defaultColorPalettes, wcagRules as w } from "../../variables";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import MockupButton from "../../components/mockupButton/mockupButton";
import ContrastSummaryBox from "../../components/contrastSummaryBox/contrastSummaryBox";
import ContrastSummary from "../../components/contrastSummary/contrastSummary";
import ColorPalette from "../../components/colorPalette/colorPalette";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FilteredColor from "../../FilteredColor";

function Home() {
  const { t } = useTranslation();
  const [colorList, setColorList] = useState(getColorsFromDefaultPalette(0, 0)); // start with an empty palette
  const [tableList, setTableList] = useState([""]);
  const [filterType,setFilterType] = useState("none");
  const [contrastMatrix, setContrastMatrix] = useState([""].concat(colorList));

  useEffect(() => {
    //samme som colorList men med ett tomt felt først
    setTableList([""].concat(colorList)); 
  }, [colorList]);

  useEffect(() => {
    setupContrastMatrix();
  }, [tableList]);

  //Lager matrise av fargelisten
  const setupContrastMatrix = () => {
    const table = [];
    for (let row in tableList) {
      let rowObject = [];
      for (let column in tableList) {
        rowObject.push(getCellValue(row, column));
      }
      table.push(rowObject);
    }
    setContrastMatrix(table);
  };

  const getCellValue = (rowIndex, columnIndex) => {
    //returnerer tom fordi det er samme fargene
    if (rowIndex === columnIndex) return ""; 
    if (rowIndex == 0) return tableList[columnIndex];
    else if (columnIndex == 0) {
      return tableList[rowIndex];
    }
    return getContrast(rowIndex, columnIndex);
  };

  const getFilteredColorPalette = (palette) => {
    return palette.map((c) => { return new FilteredColor(c, filterType); });
  }

  const updatePaletteFilter = (ft) => {
    setFilterType(ft);
    setColorList(colorList.map((value, i) => new FilteredColor(value.original, ft)));
  }
  
  //bruker den importerte metoden fra color API
  const getContrast = (rowIndex, columnIndex) => {
    const color1 = tableList[columnIndex].filtered;
    const color2 = tableList[rowIndex].filtered;
    const colorComparison = checkColors(color1, color2);
    return colorComparison.contrast; 
  };

  return (
    <div className="app-adaptive-bar"> 
      <div className="colorBar">
        <MyColors
          colorList={colorList}
          setColorList={setColorList}
          filterType={filterType}
        />
      </div>
      <nav className="nav-bar">
        <Tabs defaultActiveKey="about" id="main-tab-group" className="mb-3">
          <Tab eventKey="about" title={t('about-tab-title')}>
            <div className="tab-section">
              <div className="row">
                <h1 className="big-title">{t('about-section-title')}</h1>
              </div>
              <p className="p-small-about">{t('about-summary')}</p>
              <p className="p-small-about">{t('about-description')}</p>
	      <h2>{t('about-contributors-title')}</h2>
              <p className="p-small-about">{t('about-contributors')}</p>
              <p className="p-small-about">
		{t('about-code-1')}
                <a href="https://github.com/NorskRegnesentral/ccc21/" target="_blank" rel="noreferrer noopener">
		  {t('about-code-link')}
		</a>
		{t('about-code-2')}
	      </p>
              <p className="p-small-about">
		{t('about-funding-1')}
                <a href="https://nr.no/" target="_blank" rel="noreferrer noopener">
		  {t('about-funding-link')}
		</a>
		{t('about-funding-2')}
		</p>
	      <h2>{t('about-feedback-title')}</h2>
              <p className="p-small-about">
		{t('about-feedback-1')}
                <a href="https://github.com/NorskRegnesentral/ccc21/issues/new/choose" target="_blank" rel="noreferrer noopener">
		  {t('about-feedback-link')}
		</a>
		{t('about-feedback-2')}
	      </p>
            </div>
          </Tab>
          <Tab eventKey="get-started" title={t('get-started-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('get-started-section-title')}</h1>
              </div>
              <p className="p-small-about">{t('get-started-description')}</p>
              <fieldset className="default-palettes-container">
		<legend>{t('default-palettes-legend')}</legend>
                {Object.values(defaultColorPalettes).map((p) => { return getFilteredColorPalette(p); }).map((palette, index) => (
                  <div className="default-palette-container" key={"default-palette-container-" + index}>
                    <input id={"color-palette-"+index} type="radio"  className="radio-button"  checked={colorList == palette ? true : false} onChange={()=>setColorList(palette)}/>   
                    <ColorPalette colors={palette} labelId={"color-palette-"+index}></ColorPalette>
                  </div>
                ))}
              </fieldset>
            </div>
          </Tab>
          <Tab eventKey="contrast" title={t('contrast-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('contrast-section-title')}</h1>
              </div>
      <p id="contrastTableDescr" className="p-small-about">{t('contrast-description')} </p>
              <ContrastTable aria-details={t('contrast-table-title')} contrastMatrix={contrastMatrix}></ContrastTable>
            </div>
          </Tab>
          <Tab eventKey="recommendation" title={t('recommendation-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('recommendation-section-title')}</h1>
              </div>
              <p className="recommendation-explanation">
                {t('recommendation-explanation')}
              </p>
              <div className="aboutSectionTextBoxContainer">
                <ContrastSummaryBox title={t('contrast-summary-aa')} titleIcon={<TextFieldsIcon/>} backgroundColor={contrastColors.AA}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.aaTextMin, w.contrastMax)}></ContrastSummaryBox>
                <ContrastSummaryBox title={t('contrast-summary-aaa')} titleIcon={<TextFieldsIcon/>} backgroundColor={contrastColors.AAA}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.aaaTextMin, w.contrastMax)}></ContrastSummaryBox>
                <ContrastSummaryBox title={t('contrast-summary-nontext-aa')} titleIcon={<AutoAwesomeMosaicIcon/>} backgroundColor={contrastColors.AANontext}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.aaNonTextMin, w.contrastMax)}></ContrastSummaryBox>
                <ContrastSummaryBox title={t('contrast-summary-low')} titleIcon={<VisibilityOffIcon/>} backgroundColor={contrastColors.none}
                                    colorCombinationsList={getContrastList(contrastMatrix, w.contrastMin, w.aaNonTextMin)}></ContrastSummaryBox>
              </div>
            </div>
          </Tab>
          <Tab eventKey="testing" title={t('testing-tab-title')}>
            <div className="tab-section">
              <div className="mockup-section-title">
                <h1 className="big-title">{t('test-section-title')}</h1>
              </div>
              <p className="mockup-section-explanation">
                {t('test-section-explanation')}
              </p>
              { colorList.length >= 2 ?
              <div className="aboutSectionTextBoxContainer">
                <MockupTextBox colorList={colorList} title={t('mockup-textbox-header')}  
                               mainText={t('mockup-textbox-maintext')} 
                               titleIcon={<AutoAwesomeIcon/>} color1={colorList[3]} color2={colorList[2]} filterType={filterType}></MockupTextBox>
                <MockupIllustration colorList={colorList} color1={colorList[3]} color2={colorList[2]} filterType={filterType}></MockupIllustration>
                <MockupGraph colorList={colorList}></MockupGraph>
                <MockupButton colorList={colorList} contrastMatrix={contrastMatrix} color1={colorList[3]} color2={colorList[2]} filterType={filterType}></MockupButton>
              </div>
                :
                <p>{t("test-area-empty")}</p>
              }
            </div>
          </Tab>
          <Tab eventKey="wcag" title={t('wcag-tab-title')}>
            <div className="tab-section">
              
      <div className="row">
      <h1 className="big-title">{t('wcag-section-title')}</h1>
      </div>
      <p className="p-small-about">
      {t('about-wcag')}
    </p>
      <p className="p-small-about">
      {t('about-contrasts')}
    </p>
      <p className="p-small-about">
      <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum" target="_blank" rel="noreferrer noopener">
      {t('about-button-linking-to-wcag')}
    </a>
      {t('about-button-linking-to-wcag-ext')}
    </p>
                <ul className="aboutSectionTextBoxContainer" aria-label={t('about-wcag-list-heading')}>
                  <li>
                    <TextBox title={t('contrast-summary-aa')} titleIcon={<TextFieldsIcon/>} 
                             backgroundColor={contrastColors.AA} mainText={t('about-wcag-aa')}></TextBox>
                  </li>
                  <li>
                    <TextBox title={t('contrast-summary-aaa')} titleIcon={<TextFieldsIcon/>} 
                             backgroundColor={contrastColors.AAA} mainText={t('about-wcag-aaa')}></TextBox>
                  </li>
                  <li>
                    <TextBox title={t('contrast-summary-nontext-aa')} titleIcon={<AutoAwesomeMosaicIcon/>} 
                             backgroundColor={contrastColors.AANontext} mainText={t('about-wcag-nontext-aa')}></TextBox>
                  </li>
                  <li>
                    <TextBox title={t('contrast-summary-low')} titleIcon={<VisibilityOffIcon/>} 
                             backgroundColor={contrastColors.none} mainText={t('about-wcag-low')}></TextBox>
                  </li>
                </ul>
            </div>
          </Tab>
          <Tab eventKey="colblind" title={t('tab-colblind-title-short')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('tab-colblind-title-long')}</h1>
              </div>
              <p className="p-small-about">{t('tab-colblind-title-description-1')} </p>
              <p className="p-small-about">{t('tab-colblind-title-description-2')} </p>
              <fieldset className="filter-selector">
                <div className="radio-button-container">
                  <label htmlFor="Normal">Normal</label>
                  <input type="radio" className="radio-button" checked={filterType === "none"} onChange={()=>updatePaletteFilter("none")}/>   
                </div>    
                <div className="radio-button-container">
                  <label htmlFor="Protan">Protan</label>
                  <input type="radio" className="radio-button" checked={filterType === "protan"} onChange={()=>updatePaletteFilter("protan")}/>   
                </div>    
                <div className="radio-button-container">
                  <label htmlFor="Deutan">Deutan</label>
                  <input type="radio" className="radio-button" checked={filterType === "deutan"} onChange={()=>updatePaletteFilter("deutan")}/>   
                </div>    
                <div className="radio-button-container">
                  <label htmlFor="Tritan">Tritan</label>
                  <input type="radio" className="radio-button" checked={filterType === "tritan"} onChange={()=>updatePaletteFilter("tritan")}/>   
                </div>    
              </fieldset>
              <p className="p-small-about">[1] Brettel, H., Viénot, F., & Mollon, J. D. (1997). Computerized simulation of color appearance for dichromats. Journal of the Optical Society of America. A, Optics, Image Science, and Vision, 14(10), 2647–2655. <a href="https://doi.org/10.1364/josaa.14.002647">https://doi.org/10.1364/josaa.14.002647</a></p>
            </div>
          </Tab>
        </Tabs>
        <Footer
        backgroundColor="#fcfcfc"
        textColor="#1f1235"
        />
      </nav>
    </div>
  );
}

export default Home;
