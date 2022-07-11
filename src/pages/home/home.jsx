import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ContrastTable from "../../components/contrastTable/contrastTable";
import ContrastSummary from "../../components/contrastSummary/contrastSummary";
import MockupPage from "../../components/mockupPage/mockupPage";
import MyColors from "../../components/myColors/myColors";
import Footer from "../../components/footer/footer";
import { checkColors } from "../../color-checker";
import { getColorsFromDefaultPalette } from "../../contrast-calculations";

function Home() {
  //const [colorList, setColorList] = useState(["#f5f5f5", "#404040", "#d4ece9", "#1c6e65",  "#ffeba3"]); //HARDKODA, FJERN SENERE
  const [colorList, setColorList] = useState(getColorsFromDefaultPalette(5, 0)); //HARDKODA, FJERN SENERE
  const [tableList, setTableList] = useState([""]);
  const [contrastMatrix, setContrastMatrix] = useState([""].concat(colorList));

  //denne kjører hver gang colorList oppdateres
  useEffect(() => {
    setTableList([""].concat(colorList)); //samme som colorList men med ett tomt felt først
  }, [colorList]);

  useEffect(() => {
    setupContrastMatrix();
  }, [tableList]);

  const setupContrastMatrix = () => {
    const table = [];
    for (let row in tableList) {
      let rowObject = [];
      for (let column in tableList) {
        rowObject.push(getCellValue(row, column));
      }
      table.push(rowObject);
    }
    //console.log("matrix laget", table)
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
    const contrast = checkColors(color1, color2);
    return contrast.contrast; //contrast har mange verdier. Console.log for å se alle muligheter:)
  };

  return (
    <div className="App">
      <div>
        <NavBar
          title="kontrastsjekker"
          backgroundColor="#1c4259"
          textColor="#ffffff"
          topFixed={true}
        ></NavBar>
        <MyColors
            colorList={colorList}
            setColorList={setColorList}
          ></MyColors>
      </div>
      <div className="content">
        <div className="contentLeft">
          <ContrastSummary contrastMatrix={contrastMatrix}></ContrastSummary>
        </div>
        <div className="contentRight">
            <ContrastTable contrastMatrix={contrastMatrix}></ContrastTable>
            <MockupPage contrastMatrix={contrastMatrix} colorList={colorList}></MockupPage>
        </div>
      </div>
      <Footer
        backgroundColor={"#1c4259"}
        textColor={"#ffffff"}
        text={"Kontakt: email@email.no"}
      />
    </div>
  );
}

export default Home;
