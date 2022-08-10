// SPDX-License-Identifier: GPL-3.0-or-later
import "./mockupTextBox.css";
import React, {useState} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";

const MockupTextBox = ({ title, titleIcon, textColor, mainText, color1, color2, colorList }) => {
    const [colorForText, setcolorForText] = useState(colorList.length >= 2 ? colorList[0] : "#ffffff");
    const [colorForBackground, setcolorForBackground] = useState(colorList.length >= 2 ? colorList[1] : "#000000");


  return (
    <div
      className="mockupElement"
      style={{
        backgroundColor: colorForBackground,
        color: textColor
      }}
    >
        <div className="mockup-color-bar">
            <MockupColorPicker topColorPicker={true}  chosenColor={colorForText} setChosenColor={setcolorForText} colorList = {colorList}></MockupColorPicker>
            <MockupColorPicker bottomColorPicker={true} chosenColor={colorForBackground} setChosenColor={setcolorForBackground} colorList = {colorList}></MockupColorPicker>
        </div>
        <div className="mockup-element-content">
            <div className="title">
                <div style={{ color: colorForText }}>{titleIcon}</div>
                <h2 className="h1-text-box" style={{ color: colorForText }}>{title}</h2>
            </div>
            <div>
                <p className="p-text-box" style={{ color: colorForText }}>{mainText}</p>
            </div>
        </div>
    </div>
  );
};


export default MockupTextBox;
