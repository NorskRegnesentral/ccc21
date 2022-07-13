import "./mockupTextBox.css";
import React, {useState} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";

const MockupTextBox = ({ title, titleIcon, textColor, mainText, color1, color2, colorList }) => {
    const [colorForText, setcolorForText] = useState(color1);
    const [colorForBackground, setcolorForBackground] = useState(color2);

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
                <h1 className="h1-text-box" style={{ color: colorForText }}>{title}</h1>
            </div>
            <div>
                <p className="p-text-box" style={{ color: colorForText }}>{mainText}</p>
            </div>
        </div>
    </div>
  );
};


export default MockupTextBox;
