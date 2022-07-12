import "./contrastSummaryBox.css";
import React from "react";


const ContrastSummaryBox = ({ colorCombinationsList, title, titleIcon, backgroundColor }) => {

  return (
    <div className="contrastSummary" style={{ backgroundColor:backgroundColor }}>
        <div className="title">
            <div>{titleIcon}</div>
            <h1 className="contrast-summary-h1"> {title} </h1>     
        </div>
        <div className="contrast-summary-content">  
            <p style={{ color:"grey", fontSize: "10px" }}>Her kommer eksempler på de ulike kombinasjonene i bruk: tekstboks, graf etc </p>
            <ul className="contrastSummaryList">
                {Object.values(colorCombinationsList).map((item, index) => (
                <li key={"AA" + index} className="contrastSummaryListItem">
                    <div
                    className="colorBox"
                    style={{ backgroundColor: item.farge1 }}
                    />
                    <div
                    className="colorBox"
                    style={{ backgroundColor: item.farge2 }}
                    />
                </li>
                ))}
            </ul>
        </div>  
    </div>
  );
};
export default ContrastSummaryBox;
