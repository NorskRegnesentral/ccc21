// SPDX-License-Identifier: GPL-3.0-or-later
import "./mockupTextBox.css";
import React, {useState} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import FilteredColor from "../../FilteredColor";

const MockupTextBox = ({ title, titleIcon, textColor, mainText, color1, color2, colorList, filterType }) => {
  const [colorForText, setcolorForText] = useState(colorList.length >= 2 ? colorList[0] : new FilteredColor("#ffffff", filterType));
  const [colorForBackground, setcolorForBackground] = useState(colorList.length >= 2 ? colorList[1] : new FilteredColor("#000000", filterType));

  return (
    <div
      className="mockupElement"
      style={{
        backgroundColor: colorForBackground.filtered,
        color: textColor
      }}
    >
      <div className="mockup-color-bar">
            <MockupColorPicker topColorPicker={true}  chosenColor={colorForText} setChosenColor={setcolorForText} colorList = {colorList} filterType={filterType}></MockupColorPicker>
            <MockupColorPicker bottomColorPicker={true} chosenColor={colorForBackground} setChosenColor={setcolorForBackground} colorList = {colorList} filterType={filterType}></MockupColorPicker>
        </div>
        <div className="mockup-element-content">
            <div className="title">
                <div style={{ color: colorForText.filtered }}>{titleIcon}</div>
                <h2 className="h1-text-box" style={{ color: colorForText.filtered }}>{title}</h2>
            </div>
            <div>
                <p className="p-text-box" style={{ color: colorForText.filtered }}>{mainText}</p>
            </div>
        </div>
    </div>
  );
};


export default MockupTextBox;
