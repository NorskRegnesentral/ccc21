// SPDX-License-Identifier: GPL-3.0-or-later
import "./mockupColorPicker.css";
import React, {useState, useEffect} from "react";
import ColorizeIcon from '@mui/icons-material/Colorize';
import { getBlackOrWhiteAsBestContrast } from "../../contrast-calculations";
import { useTranslation } from 'react-i18next';



const MockupColorPicker = ({ chosenColor, setChosenColor, colorList, topColorPicker, bottomColorPicker }) => {
    const { t } = useTranslation();
    const [colorsVisibility, setcolorsVisibility] = useState(false);
    const [indexOfColor, setIndexOfColor] = useState(colorList.indexOf(chosenColor)); 

    useEffect(() => {
      //hvis lista ikke har fargen lengre (du endrer fargekoden eller krysser ut)
      if(!colorList.includes(chosenColor)) {
        //hvis du krysser ut den siste fargen
        if(indexOfColor >= colorList.length-1) setChosenColor(colorList[colorList.length-1]);
        //hvis du endrer på fargekoden
        else setChosenColor(colorList[indexOfColor]);
        return;
      }
      //hvis fargen er i lista, men på et annet sted enn tidligere (noe over har blitt krysset ut)
      if(colorList.indexOf(chosenColor) != indexOfColor){
        const newIndex = colorList.indexOf(chosenColor);
        setChosenColor(colorList[newIndex]);
      } 
      //mindre eller lik en farge å velge mellom
      if(colorList.length <= 1){ 
      if(colorList.length == 1){
        setChosenColor(colorList[0]);
        return;
      } 
    }
    }, [colorList]); 

    
    useEffect(() => {
      if(colorList.indexOf(chosenColor) > -1) setIndexOfColor(colorList.indexOf(chosenColor));
    }, [chosenColor]);


  return (
    <div className="mockup-color-picker">
        <button className = {topColorPicker ? "mockup-color-bar-color mockup-color-bar-color-top" : bottomColorPicker ? "mockup-color-bar-color mockup-color-bar-color-bottom" : "mockup-color-bar-color" }  
        style={{ backgroundColor: chosenColor }} onClick={() => setcolorsVisibility(!colorsVisibility)} value="change color">
            <ColorizeIcon style={{color : getBlackOrWhiteAsBestContrast(chosenColor)}}></ColorizeIcon>
            <p className="hide-text">{t('change-color')}</p>
        </button>      
        <ul className="mockup-color-picker-list" style={{ display: colorsVisibility ?  "flex" : "none" }}> 
            {Object.values(colorList).map((color, index) => (
                <li className="color-picker-list-item-wrap">
                    <button onClick={() => setChosenColor(color)} className="colorBlock" title={color} style={{ backgroundColor: color }}></button>
                </li>
            ))}
        </ul>
    </div>
  );
};


export default MockupColorPicker;