import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ColorInput from "../../components/colorInput/colorInput";
import ContrastTable from "../../components/contrastTable/contrastTable";
import ContrastSummary from "../../components/contrastSummary/contrastSummary";
import MyColors from "../../components/myColors/myColors";
import { checkColors } from "../../color-checker";

function Home() {
  const [colorList, setColorList] = useState(["#000000"]);
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
      <NavBar></NavBar>
      <div className="content">
        <div className="contentGroup">
          <MyColors
            colorList={colorList}
            setColorList={setColorList}
          ></MyColors>
        </div>
        <div className="contentGroup">
          <ContrastSummary contrastMatrix={contrastMatrix}></ContrastSummary>
          <ContrastTable contrastMatrix={contrastMatrix}></ContrastTable>
        </div>
        <div className="contentGroup">
          <h1>Her kommer visning av komponenter i fargene</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
