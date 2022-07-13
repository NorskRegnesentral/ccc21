import "./mockupGraph.css";
import React, {useState, useEffect} from "react";
import MockupColorPicker from "../mockupColorPicker/mockupColorPicker";


const MockupGraph = ({ colorList }) => {
    const [degreesPerColor, setDegreesPerColor]= useState(360/colorList.length);
    const [pieChartValues, setPieChartValues] = useState();
    useEffect(() => {
        setDegreesPerColor(360/colorList.length);
        setPieChartValues(getPieChartColors);
      }, [colorList]);

        /*Returnerer en string som brukes til å sette fargene i pie chart
    * Formen er "conic-gradinet( #hex xdeg ydeg, #hex2 ydeg zdeg) 
    * hvor gradene er start- og slutt-sted for hver enkelt farge
    */
const getPieChartColors = () => {
    let string = "conic-gradient("
    colorList.map((value, i) => (i+1 === colorList.length ? string = string + colorList[i] + " " + degreesPerColor*i + "deg " + (degreesPerColor*i+degreesPerColor) + "deg" : string = string + colorList[i] + " " + degreesPerColor*i + "deg " + (degreesPerColor*i+degreesPerColor) + "deg, "))
    string = string + ")"
    return string
  }
    

  return (
    <div className="mockup-graph">
        {/*<div className="mockup-color-bar">
            <MockupColorPicker  topColorPicker={true} chosenColor={colorMain} setChosenColor={setColorMain} colorList={colorList}></MockupColorPicker>
            <MockupColorPicker  bottomColorPicker={true} chosenColor={colorSecondary} setChosenColor={setColorSecondary} colorList={colorList}></MockupColorPicker>
  </div>*/}
        <div>
            <div class="piechart" style={{backgroundImage: pieChartValues}}></div>
        </div>
        <p>Kakediagrammet viser <br></br>alle fargene dine samlet <br></br>:) <br></br><br></br> Psst! Flere charts kommer</p>
    </div>
  );
};


export default MockupGraph;
