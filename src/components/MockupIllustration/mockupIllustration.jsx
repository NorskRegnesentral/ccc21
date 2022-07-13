import "./mockupIllustration.css";
import React, {useState} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";
import { UndrawBrowser, UndrawChatting, UndrawCalendar } from "react-undraw-illustrations"; /* Alle her har primaryColor og accentColor */


const MockupIllustration = ({ color1, color2, colorList }) => {
    const [colorMain, setColorMain] = useState(color1);
    const [colorSecondary, setColorSecondary] = useState(color2);
    

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
