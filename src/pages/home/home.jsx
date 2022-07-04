import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ColorInput from "../../components/colorInput/colorInput";
import ContrastTable from "../../components/contrastTable/contrastTable";

function Home() {
  const [colorList, setColorList] = useState(["#000000"]);
  useEffect(() => {},[]);

  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  var updateColorValue = (index, newValue) => {
    setColorList(colors => colors.map((value, i) => i === index ? newValue : value))
  }

  var removeColorValue = (index) => {
    setColorList((colorList) => colorList.filter((_, i) => i !== index.index))
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="content">
        <div className="contentGroup">
          <h1>Farger</h1>
          <div className="inputFields">
            {colorList.map((color, index) => (
              <ColorInput key={"color"+index} index={index} colorValue={color} updateColorValue={updateColorValue} removeColorValue={removeColorValue} ></ColorInput>
            ))}
          </div>
          <button
            onClick={() => setColorList((colorList) => [...colorList, "#000000"])}
          >
            legg til fargekode
          </button>
        </div>
        <div className="contentGroup">
          <h1>Her kommer tabell med størrelse {Object.keys(colorList).length+1} x {Object.keys(colorList).length+1} </h1>
          <ContrastTable colorList={colorList}></ContrastTable>
        </div>
        <div className="contentGroup">
          <h1>Her kommer visning av komponenter i fargene</h1>
        </div>
      </div>
    
    </div>
  );
}

export default Home;
