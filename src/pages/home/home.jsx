import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ColorInput from "../../components/colorInput/colorInput";

function Home() {
  const [colorList, setColorList] = useState(["#ffffff"]);
  useEffect(() => {},[]);
  useEffect(() => console.log("color list has changed",colorList), [colorList]);


  /** Metoden oppdaterer en farge i listen når du endrer fargen i brukergrensesnittet */
  var updateColorValue = (index, newValue) => {
    setColorList(colors => colors.map((value, i) => i === index ? newValue : value))
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="content">
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
        <div className="contrastTable"></div>
      </div>
      <div className="footer">
        <p>footer 2022</p>
      </div>
    </div>
  );
}

export default Home;
