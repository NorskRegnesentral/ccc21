// SPDX-License-Identifier: GPL-3.0-or-later
import "./mockupIllustration.css";
import React, {useState, useEffect} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import { UndrawBrowser, UndrawChatting, UndrawCalendar } from "react-undraw-illustrations"; /* Alle her har primaryColor og accentColor */
import FilteredColor from "../../FilteredColor";


const MockupIllustration = ({ color1, color2, colorList, filterType }) => {
  const [colorMain, setColorMain] = useState(colorList.length >= 2 ? colorList[0] : new FilteredColor("#ffffff", filterType));
  const [colorSecondary, setColorSecondary] = useState(colorList.length >= 2 ? colorList[1] : new FilteredColor("#000000", filterType));

  return (
    <div className="mockupElement">
        <div className="mockup-color-bar">
            <MockupColorPicker  topColorPicker={true} chosenColor={colorMain} setChosenColor={setColorMain} colorList={colorList} filterType={filterType}></MockupColorPicker>
            <MockupColorPicker  bottomColorPicker={true} chosenColor={colorSecondary} setChosenColor={setColorSecondary} colorList={colorList} filterType={filterType}></MockupColorPicker>
        </div>
        <div>
            <div className="mockup-illustration-container">
                <UndrawCalendar
                primaryColor={colorMain.filtered}
                accentColor={colorSecondary.filtered}
                height="9rem"
                />
            </div>
        </div>
    </div>
  );
};


export default MockupIllustration;
