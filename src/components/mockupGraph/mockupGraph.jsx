/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./mockupGraph.css";
import React, {useState, useEffect} from "react";

const MockupGraph = ({ colorList }) => {
    const [pieChartValues, setPieChartValues] = useState();
    
    useEffect(() => {
      setPieChartValues(getPieChartColors());
    }, [colorList]);

    /*Returnerer en string som brukes til å sette fargene i pie chart
    * Formen er "conic-gradinet( #hex xdeg ydeg, #hex2 ydeg zdeg) 
    * hvor gradene er start- og slutt-sted for hver enkelt farge
    */
  const getPieChartColors = () => {
    const degreesPerColor = (360/colorList.length);
    let string = "conic-gradient("
    colorList.map((value, i) => (i+1 === colorList.length ? string = string + colorList[i] + " " + degreesPerColor*i + "deg " + (degreesPerColor*i+degreesPerColor) + "deg" : string = string + colorList[i] + " " + degreesPerColor*i + "deg " + (degreesPerColor*i+degreesPerColor) + "deg, "))
    string = string + ")"
    return string
  }
    

  return (
    <div className="mockup-graph">
        <div>
            <div class="piechart" style={{backgroundImage: pieChartValues}}></div>
        </div>
        <p>Kakediagrammet viser <br></br>alle fargene dine samlet! <br></br><br></br></p>
    </div>
  );
};


export default MockupGraph;
