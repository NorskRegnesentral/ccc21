/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./colorPalette.css";
import React, {useState} from "react";

const ColorPalette = ({ colors}) => {

  return (
    <div className="color-palette-container">
        {Object.values(colors).map((color, index) => (
          <div className="color-palette-color" style={{backgroundColor:color.original}} key={"color-palette-color-" + index}>
            </div>
        ))}   
    </div>   
  );
};


export default ColorPalette;
