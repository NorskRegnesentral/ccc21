// SPDX-License-Identifier: GPL-3.0-or-later
import "./mockupIllustration.css";
import React, {useState, useEffect} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import { UndrawBrowser, UndrawChatting, UndrawCalendar } from "react-undraw-illustrations"; /* Alle her har primaryColor og accentColor */


const MockupIllustration = ({ color1, color2, colorList }) => {
    const [colorMain, setColorMain] = useState(colorList.length >= 2 ? colorList[0] : "#ffffff");
    const [colorSecondary, setColorSecondary] = useState(colorList.length >= 2 ? colorList[1] : "#000000");

  return (
    <div className="mockupElement">
        <div className="mockup-color-bar">
            <MockupColorPicker  topColorPicker={true} chosenColor={colorMain} setChosenColor={setColorMain} colorList={colorList}></MockupColorPicker>
            <MockupColorPicker  bottomColorPicker={true} chosenColor={colorSecondary} setChosenColor={setColorSecondary} colorList={colorList}></MockupColorPicker>
        </div>
        <div>
            <div className="mockup-illustration-container">
                <UndrawCalendar
                primaryColor={colorMain}
                accentColor={colorSecondary}
                height="9rem"
                />
            </div>
        </div>
    </div>
  );
};


export default MockupIllustration;
