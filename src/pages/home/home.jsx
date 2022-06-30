import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ColorInput from "../../components/colorInput/colorInput";
import ContrastTable from "../../components/contrastTable/contrastTable";

function Home() {
  const [colorList, setColorList] = useState(["#ffffff"]);
  useEffect(() => {},[]);

  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  var updateColorValue = (index, newValue) => {
    setColorList(colors => colors.map((value, i) => i === index ? newValue : value))
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="content">
        <div className="contentGroup">
          <h1>Farger</h1>
          <div className="inputFields">
            {colorList.map((color, index) => (
              <ColorInput key={"color"+index} index={index} colorValue={color} updateColorValue={updateColorValue} ></ColorInput>
            ))}
          </div>
          <button
            onClick={() => setColorList((colorList) => [...colorList, "#ffffff"])}
          >
            legg til fargekode
          </button>
        </div>
        <div className="contentGroup">
          <h1>Her kommer tabell med størrelse {Object.keys(colorList).length}</h1>
          <ContrastTable colorList={colorList}></ContrastTable>
        </div>
        <div className="contentGroup">
          <h1>Her kommer visning av komponenter i fargene</h1>
        </div>
      </div>
      <div className="footer">
        <p>footer 2022</p>
      </div>
    </div>
  );
}

export default Home;
