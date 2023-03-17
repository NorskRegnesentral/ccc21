// SPDX-License-Identifier: GPL-3.0-or-later
import "./mockupButton.css";
import React, {useState, useEffect} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import { useTranslation } from 'react-i18next';
import { color } from "@mui/system";
import FilteredColor from "../../FilteredColor";

const MockupButton = ({ colorList, filterType }) => {
  const { t } = useTranslation();
  const [colorMain, setColorMain] = useState(colorList.length >= 2 ? colorList[0] : new FilteredColor("#ffffff", filterType)); 
  const [colorSecondary, setColorSecondary] = useState(colorList.length >= 2 ? colorList[1] : new FilteredColor("#000000", filterType));

  return (
    <div className="mockupElement">
    <div className="mockup-color-bar">
      <MockupColorPicker  topColorPicker={true} chosenColor={colorMain} setChosenColor={setColorMain} colorList={colorList} filterType={filterType}></MockupColorPicker>
        <MockupColorPicker  bottomColorPicker={true} chosenColor={colorSecondary} setChosenColor={setColorSecondary} colorList={colorList} filterType={filterType}></MockupColorPicker>
    </div>
    <div className="mockup-test-button-container">
      <button style={{ color: colorMain.filtered, backgroundColor: colorSecondary.filtered, border: "2px solid "}} className="mockupn" >
        {t('ok')}  
      </button>
      <button style={{ color: colorSecondary.filtered, backgroundColor: colorMain.filtered, border: "2px solid "}} className="mockupn" >
        {t('cancel')}  
      </button>
    </div>
</div>
  );
};


export default MockupButton;
