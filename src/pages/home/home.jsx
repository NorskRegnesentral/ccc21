import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ColorInput from "../../components/colorInput/colorInput";
import ContrastTable from "../../components/contrastTable/contrastTable";
import ContrastPreview  from "../../components/contrastPreview/contrastPreview";
import {checkColors} from "../../color-checker"; 

function Home() {
  const [colorList, setColorList] = useState(["#000000"]);
  const [tableList, setTableList] = useState([]);
  const [contrastMatrix, setContrastMatrix] = useState();

   //tabell-listen skal alltid være den samme som fargelisten, 
  //men med ett tomt felt først
  useEffect(() => {
    setTableList([""].concat(colorList));
    console.log("oppdater kontrast matrise")
    const table2 = []
    for(let row in tableList){
      let rowObject = []
      for(let column in tableList){
        //rowObject.push((row+column))
        rowObject.push(getCellValue(row,column))
      }
      table2.push(rowObject)
    }
    console.log("tabell2", table2)
  },[colorList]);

  const getCellValue = (rowIndex, columnIndex) => {
    console.log("get cell value", rowIndex + "og" + columnIndex)
    console.log("table list atm", tableList)
    if(rowIndex === 0) return tableList[columnIndex];
    else if (columnIndex === 0) return tableList[rowIndex];
    if(rowIndex === columnIndex) return "" //returnerer tom fordi det er samme fargene
    return "kommer";
    //return getContrast(rowIndex,columnIndex); 
  }

  //bruker den importerte metoden fra color API 
  const getContrast = (rowIndex, columnIndex) => {
    const color1 =  tableList[columnIndex];
    console.log("color 2", tableList[rowIndex])
    const color2 = tableList[rowIndex];
    console.log("finner fargekontrast", color1 + "og" + color2)
    const contrast = checkColors(color1, color2); 
    return contrast.contrast; //contrast har mange verdier. Console.log for å se alle muligheter:)
  }

  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  // todo: flytt inn i myColors-component
  const updateColorValue = (index, newValue) => {
    setColorList(colors => colors.map((value, i) => i === index ? newValue : value))
  }

  // todo: flytt inn i myColors-component
  const removeColorValue = (index) => {
    setColorList((colorList) => colorList.filter((_, i) => i !== index.index))
  }



  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="content">
        <div className="contentGroup">
          <h1>Dine farger</h1>          
          <div className="inputFields">
            {colorList.map((color, index) => (
              <ColorInput key={"color"+index} index={index} colorValue={color} updateColorValue={updateColorValue} removeColorValue={removeColorValue} ></ColorInput>
            ))}
          </div>
          <button onClick={() => setColorList((colorList) => [...colorList, "#000000"])}>
            legg til fargekode
          </button>
        </div>
        <div className="contentGroup">
          <h1>Her kommer tabell med størrelse {Object.keys(colorList).length+1} x {Object.keys(colorList).length+1} </h1>
          <ContrastTable colorList={colorList}></ContrastTable>
        </div>
        <div className="contentGroup">
          <h1>Her kommer visning av komponenter i fargene</h1>
          <ContrastPreview title="gode matcher"></ContrastPreview>
          <ContrastPreview title="dårligere matcher"></ContrastPreview>
        </div>
      </div>
    
    </div>
  );
}

export default Home;
