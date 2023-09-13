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
import i18next from 'i18next';
import {HashLink as Link} from 'react-router-hash-link';

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
    <div>
      <Link class="skip-link" to="#main-tab-group">{t('skip-link')}</Link>
      <div className="app-adaptive-bar"> 
	<div className="colorBar">
   		<MyColors
      		colorList={colorList}
         setColorList={setColorList}
         filterType={filterType}
      />
   </div>
   <nav className="nav-bar">
		<Tabs defaultActiveKey="contrast" id="main-tab-group" className="mb-3">
         
         {/* About Tab*/}
		  <Tab eventKey="about" title={t('about-tab-title')}>
            <div className="tab-section">
              <div className="row">
                <h1 className="big-title">{t('name-full')} ({t('name-short')})</h1>
              </div>
              <p className="p-small-about">{t('about-summary')}</p>
              <p className="p-small-about">{t('about-description')}</p>
         <h2>{t('structure-title')}</h2>
         {t('structure')}
         <ul class="regular">
            <li><b>«{t('get-started-tab-title')}»</b>: {t('get-started-tab-description')}</li>
            <li><b>«{t('contrast-tab-title')}»</b>: {t('contrast-tab-description')}</li>
            <li><b>«{t('recommendation-tab-title')}»</b>: {t('recommendation-tab-description')}</li>
            <li><b>«{t('testing-tab-title')}»</b>: {t('testing-tab-description')}</li>
            <li><b>«{t('wcag-tab-title')}»</b>: {t('wcag-tab-description')}</li>
            <li><b>«{t('coldef-tab-title')}»</b>: {t('coldef-tab-description')}</li>
         </ul>
	      <h2>{t('about-contributors-title')}</h2>
              <p className="p-small-about">{t('about-contributors')}: <a href={t('contributor-link-1')} target="_blank" rel="noreferrer noopener">{t('contributor-1')}</a>, <a href={t('contributor-link-2')} target="_blank" rel="noreferrer noopener">{t('contributor-2')}</a>, <a href={t('contributor-link-3')} target="_blank" rel="noreferrer noopener">{t('contributor-3')}</a>, <a href={t('contributor-link-4')} target="_blank" rel="noreferrer noopener">{t('contributor-4')}</a>.  
			</p>
              <p className="p-small-about">
		{t('about-code-1')}
                <a href="https://github.com/NorskRegnesentral/ccc21/" target="_blank" rel="noreferrer noopener">
		  {t('about-code-link')}
		</a>
		{t('about-code-2')}
	      </p>
              <p className="p-small-about">
		{t('about-funding-1')}
                <a href="https://nr.no/prosjekter/tilgjengelige-kontraster/" target="_blank" rel="noreferrer noopener">
		  {t('about-funding-link-1')}
		</a>
		{t('about-funding-2')}
		  			<a href="https://www.bufdir.no/tilskudd/uu/" targets="_blank" rel="noreferrer noopener">
		  {t('about-funding-link-2')}
		</a>
		  {t('about-funding-3')}
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
         
         {/* Get Started Tab */}
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
                    <input type="radio" id={"color-palette-"+index} className="radio-button" checked={colorList == palette ? true : false} onChange={()=>setColorList(palette)}/>
		    <label htmlFor={"color-palette-"+index} aria-label={"color-palette-"+index}>
                      <ColorPalette colors={palette}></ColorPalette>
		    </label>
                  </div>
                ))}
              </fieldset>
              <p className="p-small-about">{t('default-palettes-description-1')} <a href="https://colorbrewer2.org/" targets="_blank" rel="noreferrer noopener">ColorBrewer 2.0</a> {t('default-palettes-description-2')} <a href="https://colorhunt.co/" targets="_blank" rel="noreferrer noopener">Color Hunt</a>{t('default-palettes-description-3')}</p>
            </div>
          </Tab>
          
          {/* Contrast Tab */}
          <Tab eventKey="contrast" title={t('contrast-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('contrast-section-title')}</h1>
              </div>
      <p id="contrastTableDescr" className="p-small-about">{t('contrast-description')} </p>
              <ContrastTable aria-details={t('contrast-table-title')} contrastMatrix={contrastMatrix}></ContrastTable>
            </div>
          </Tab>
          
          {/* Recommendation Tab */}
          <Tab eventKey="recommendation" title={t('recommendation-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('recommendation-section-title')}</h1>
              </div>
              { colorList.length >= 0 ? 
              <p className="recommendation-explanation">
                {t('recommendation-no-colors')}
              </p>
              : 
              <p className="recommendation-explanation">
                {t('recommendation-explanation')}
              </p>
              }
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
          
          {/* Testing Tab */}
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
          
          {/* WCAG Tab*/}
          <Tab eventKey="wcag" title={t('wcag-tab-title')}>
            <div className="tab-section">
              
      <div className="row">
      <h1 className="big-title">{t('wcag-section-title')}</h1>
      </div>
      <p className="p-small-about">
      {t('about-wcag')}
    </p>
      <p className="p-small-about">
      {t('about-wcag-versions-1')} <a href={t('wcag-20-link')} target="_blank" rel="noreferrer noopener">{t('wcag-20')}</a>, <a href={t('wcag-21-link')} target="_blank" rel="noreferrer noopener">{t('wcag-21')}</a> {t('wcag-22-1')} <a href={t('wcag-22-link')} target="_blank" rel="noreferrer noopener">{t('wcag-22')}</a>.
    </p>
    <h2>{t('about-contrasts-title')}</h2>
      <p className="p-small-about">
      {t('about-contrasts')}&nbsp;
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
          <Tab eventKey="colblind" title={t('coldef-tab-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('tab-colblind-title-long')}</h1>
              </div>
              <p className="p-small-about">{t('tab-colblind-title-description-2')}</p>
              <fieldset className="colblind-container">
		<legend>{t('tab-colblind-fieldset-title')}</legend>
                <div className="radio-button-container">
                  <input type="radio" id="cb-none" className="radio-button" checked={filterType === "none"} onChange={()=>updatePaletteFilter("none")}/>   
                  <label htmlFor="cb-none">Normal</label>
                </div>    
                <div className="radio-button-container">
                  <input type="radio" id="cb-protan" className="radio-button" checked={filterType === "protan"} onChange={()=>updatePaletteFilter("protan")}/>   
                  <label htmlFor="cb-protan">Protan</label>
                </div>    
                <div className="radio-button-container">
                  <input type="radio" id="cb-deutan" className="radio-button" checked={filterType === "deutan"} onChange={()=>updatePaletteFilter("deutan")}/>   
                  <label htmlFor="cb-deutan">Deutan</label>
                </div>    
                <div className="radio-button-container">
                  <input type="radio" id="cb-tritan" className="radio-button" checked={filterType === "tritan"} onChange={()=>updatePaletteFilter("tritan")}/>   
                  <label htmlFor="cb-tritan">Tritan</label>
                </div>    
              </fieldset>
              <p className="p-small-about">{t('tab-colblind-title-description-1')}</p>
              <p className="p-small-about">
		<span>{t('tab-colblind-reference')} </span>
		<a href={t('tab-colblind-reference-link')} target="_blank" rel="noreferrer noopener">{t('tab-colblind-reference-link')}</a>
	      </p>
            </div>
          </Tab>
          <Tab eventKey="prefs" title={t('prefs-title')}>
            <div className="tab-section">
              <div className="see-contrast-heading">
                <h1 className="big-title">{t('prefs-title')}</h1>
              </div>
	      <section class="setting">
		<p className="p-small-about">
		  {t('prefs-description')}
		</p>
		<h2>{t('prefs-language')}</h2>
		<span class="label">
		  <label htmlFor="uiLang">{t('prefs-language-selected')}</label>:
		</span>
		<select id="uiLang" className="uiLang" defaultValue={i18next.language} onChange={ ( evt) => {
			  i18next.changeLanguage( evt.target.value);
			  document.documentElement.lang = evt.target.value; // better would be to use react-helmet or react-helmet-async
			} }>
		  <option value="en">English</option>
		  <option value="nb">Norsk (bokmål)</option>
		</select>
	      </section>
            </div>
          </Tab>
        </Tabs>
        <Footer
        backgroundColor="#fcfcfc"
        textColor="#1f1235"
        />
      </nav>
    </div>
    </div>
  );
}

export default Home;
