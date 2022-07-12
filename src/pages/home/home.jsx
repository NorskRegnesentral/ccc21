import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ContrastTable from "../../components/contrastTable/contrastTable";
import ContrastSummary from "../../components/contrastSummary/contrastSummary";
import MockupPage from "../../components/mockupPage/mockupPage";
import MyColors from "../../components/myColors/myColors";
import Footer from "../../components/footer/footer";
import TextBox from "../../components/textBox/textBox";
import { checkColors } from "../../color-checker";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Home() {
  const { t } = useTranslation();
  const [colorList, setColorList] = useState(getColorsFromDefaultPalette(5, 0)); 
  const [tableList, setTableList] = useState([""]);
  const [contrastMatrix, setContrastMatrix] = useState([""].concat(colorList));
  
  const [contrastColors] = useState({
    none: "#ee8181",
    AANontext: "#f7b87d",
    AA: "#ecdb79",
    AAA: "#cff7cf",
  }); //endre her hvis andre farger er ønskelig!

  //denne kjører hver gang colorList oppdateres
  useEffect(() => {
    setTableList([""].concat(colorList)); //samme som colorList men med ett tomt felt først
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
    if (rowIndex === columnIndex) return ""; //returnerer tom fordi det er samme fargene
    if (rowIndex == 0) return tableList[columnIndex];
    else if (columnIndex == 0) {
      return tableList[rowIndex];
    }
    return getContrast(rowIndex, columnIndex);
  };

  //bruker den importerte metoden fra color API
  const getContrast = (rowIndex, columnIndex) => {
    const color1 = tableList[columnIndex];
    const color2 = tableList[rowIndex];
    const colorComparison = checkColors(color1, color2);
    return colorComparison.contrast; 
  };

  return (
    <div className="App">
      <div className="colorBar">
        <MyColors
          colorList={colorList}
          setColorList={setColorList}
        />
      </div>
      <div className="rightSideBar">
        {/** 
        <NavBar
          title={t('title')}
          titleIcon={<InvertColorsRoundedIcon></InvertColorsRoundedIcon>}
          backgroundColor="#f8f5f2"
          textColor="#1f1235"  
  /> */}
        <div className="aboutSection">
          <div className="aboutSectionLeft">
            <div className="row">
              <InvertColorsRoundedIcon></InvertColorsRoundedIcon>
              <h1 className="h1-aboutSection-title">{t('about-title')}</h1>
            </div>
            <div>
            <p className="p-small-about">{t('about-description')} </p>
            {/*<p className="p-small-about">{t('about-wcag')}</p>*/}
            <a href="https://www.uutilsynet.no/fremtidig-regelverk/wcag-21-standarden/140"  target="_blank" rel="noreferrer noopener">
              <button className="primaryButton">{t('about-button-linking-to-wcag')}</button>
            </a> 
            </div>
          </div>
          <div className="aboutSectionRight">
            <div className="aboutSectionTextBoxContainer">
              <TextBox title={t('contrast-summary-aaa')} titleIcon={<TextFieldsIcon/>} 
              backgroundColor={contrastColors.AAA} mainText={t('about-wcag-aaa')}></TextBox>
              <TextBox title={t('contrast-summary-aa')} titleIcon={<TextFieldsIcon/>} 
              backgroundColor={contrastColors.AA} mainText={t('about-wcag-aa')}></TextBox>
              <TextBox title={t('contrast-summary-nontext-aa')} titleIcon={<AutoAwesomeMosaicIcon/>} 
              backgroundColor={contrastColors.AANontext} mainText={t('about-wcag-nontext-aa')}></TextBox>
              <TextBox title={t('contrast-summary-low')} titleIcon={<VisibilityOffIcon/>} 
              backgroundColor={contrastColors.none} mainText={t('about-wcag-low')}></TextBox>
            </div>
          </div>
        </div>
        <div className="tableSection">
          <ContrastTable contrastMatrix={contrastMatrix}></ContrastTable>
        </div>
        {/*<div><ContrastSummary contrastMatrix={contrastMatrix}></ContrastSummary></div>*/}
        <div className="mockupSection">
          <MockupPage contrastMatrix={contrastMatrix} colorList={colorList}></MockupPage>
        </div>
        <Footer
        backgroundColor="#f8f5f2"
        textColor="#1f1235"  
        text={t('footer-text')}
        />
      </div>
    </div>
  );
}

export default Home;
