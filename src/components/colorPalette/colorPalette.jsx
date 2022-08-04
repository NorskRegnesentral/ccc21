import "./colorPalette.css";
import React, {useState} from "react";

const ColorPalette = ({ colors }) => {

  return (
    <div className="color-palette-container">
        {/*<label for={"tekst"}>
            {"tekst"}
     </label>*/}
        {Object.values(colors).map((color, index) => (
            <div className="color-palette-color" style={{backgroundColor:color}}>
            </div>
        ))}   
    </div>   
  );
};


export default ColorPalette;
