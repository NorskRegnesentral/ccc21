import "./contrastSummaryBox.css";
import React from "react";


const ContrastSummaryBox = ({ colorCombinationsList, title, titleIcon, backgroundColor }) => {

  return (
    <div className="contrastSummary" style={{ backgroundColor:backgroundColor }}>
        <div className="title">
            <div>{titleIcon}</div>
            <h2 className="contrast-summary-h2"> {title} </h2>     
        </div>
        <div className="contrast-summary-content">  
            <ul className="contrastSummaryList">
                {Object.values(colorCombinationsList).map((item, index) => (
                <li key={"AA" + index} className="contrast-summary-list-item">
                    <div class="color-combo-circle" style={{borderRightColor: item.farge1, borderTopColor: item.farge2, borderBottomColor: item.farge1, borderLeftColor: item.farge2}}></div>
                    <div>
                        <p className="color-combo-text">{item.farge1}</p>
                        <p className="color-combo-text">{item.farge2}</p>    
                    </div>
                </li>
                ))}
            </ul>
        </div>  
    </div>
  );
};
export default ContrastSummaryBox;

