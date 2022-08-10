/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./colorPalette.css";
import React, {useState} from "react";

const ColorPalette = ({ colors, labelId }) => {

  return (
    <div className="color-palette-container">
        <label for={labelId} hidden>
            {labelId}
        </label>
        {Object.values(colors).map((color, index) => (
            <div className="color-palette-color" style={{backgroundColor:color}}>
            </div>
        ))}   
    </div>   
  );
};


export default ColorPalette;
