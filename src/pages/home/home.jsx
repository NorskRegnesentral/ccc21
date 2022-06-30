import "./home.css";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import ColorInput from "../../components/colorInput/colorInput";

function Home() {
  const [colorList, setColorList] = useState(["#8F2D2D"]);
  useEffect(() => {});

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="content">
        <div className="inputFields">
          {colorList.map((color) => (
            <ColorInput colorValue={color} ></ColorInput>
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
