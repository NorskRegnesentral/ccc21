import "./mockupButton.css";
import React, {useState, useEffect} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import { useTranslation } from 'react-i18next';
import { color } from "@mui/system";

const MockupButton = ({ colorList }) => {
  const { t } = useTranslation();
  const [colorMain, setColorMain] = useState(colorList.length >= 2 ? colorList[0] : "#ffffff"); 
  const [colorSecondary, setColorSecondary] = useState(colorList.length >= 2 ? colorList[1] : "#000000");

  useEffect(() => {
    if(colorList.length >= 2){
      if(colorList.length == 2) setColorMain(colorList[0]); setColorSecondary(colorList[1]);
      /*if(!colorList.includes(colorMain)) colorList[0] == colorSecondary ? setColorMain(colorList[1]) : setColorMain(colorList[0]);
      if(!colorList.includes(colorSecondary)) colorList[0] == colorMain ? setColorSecondary(colorList[1]) : setColorSecondary(colorList[0]);*/
    }
    else {
      if(colorList.length == 1){
        setColorMain(colorList[0]);
        setColorSecondary(colorList[0]);
        return;
      }
      setColorMain("#ffffff");
      setColorSecondary("#ffffff");
      return;
    }
  }, [colorList]);
 
  console.log(colorList.length)
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
