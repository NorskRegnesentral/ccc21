import "./mockupButton.css";
import React, {useState, useEffect} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import { useTranslation } from 'react-i18next';
import { checkColors } from "../../color-checker";

const MockupButton = ({ colorList, color1, color2 }) => {
  const { t } = useTranslation();
  const [colorMain, setColorMain] = useState(color1);
  const [colorSecondary, setColorSecondary] = useState(color2);
 
  return (
    <div className="mockupElement">
    <div className="mockup-color-bar">
        <MockupColorPicker  topColorPicker={true} chosenColor={colorMain} setChosenColor={setColorMain} colorList={colorList}></MockupColorPicker>
        <MockupColorPicker  bottomColorPicker={true} chosenColor={colorSecondary} setChosenColor={setColorSecondary} colorList={colorList}></MockupColorPicker>
    </div>
    <div className="mockup-test-button-container">
      <button style={{ color: colorSecondary, backgroundColor: colorMain, border: "2px solid "}} className="mockupn" >
      {t('button-with-contrast') + " " + checkColors(colorMain, colorSecondary).contrast}  
      </button>
    </div>
</div>
  );
};


export default MockupButton;
