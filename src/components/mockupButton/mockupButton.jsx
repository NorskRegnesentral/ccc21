// SPDX-License-Identifier: GPL-3.0-or-later
import "./mockupButton.css";
import React, {useState, useEffect} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import { useTranslation } from 'react-i18next';
import { color } from "@mui/system";

const MockupButton = ({ colorList }) => {
  const { t } = useTranslation();
  const [colorMain, setColorMain] = useState(colorList.length >= 2 ? colorList[0] : "#ffffff"); 
  const [colorSecondary, setColorSecondary] = useState(colorList.length >= 2 ? colorList[1] : "#000000");

  return (
    <div className="mockupElement">
    <div className="mockup-color-bar">
        <MockupColorPicker  topColorPicker={true} chosenColor={colorMain} setChosenColor={setColorMain} colorList={colorList}></MockupColorPicker>
        <MockupColorPicker  bottomColorPicker={true} chosenColor={colorSecondary} setChosenColor={setColorSecondary} colorList={colorList}></MockupColorPicker>
    </div>
    <div className="mockup-test-button-container">
      <button style={{ color: colorMain, backgroundColor: colorSecondary, border: "2px solid "}} className="mockupn" >
        {t('ok')}  
      </button>
      <button style={{ color: colorSecondary, backgroundColor: colorMain, border: "2px solid "}} className="mockupn" >
        {t('cancel')}  
      </button>
    </div>
</div>
  );
};


export default MockupButton;