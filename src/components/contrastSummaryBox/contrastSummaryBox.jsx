/*SPDX-License-Identifier: GPL-3.0-or-later*/
import "./contrastSummaryBox.css";
import React from "react";
import { useTranslation } from 'react-i18next';


const ContrastSummaryBox = ({ colorCombinationsList, title, backgroundColor }) => {
  const { t } = useTranslation();
  return (
    <div className="contrastSummary" style={{backgroundColor: backgroundColor}}>
        <div className="title">
            <h2 className="contrast-summary-h2">{title}</h2>     
        </div>
        <div className="contrast-summary-content">
	  {Object.values(colorCombinationsList).length ?
            <ul className="contrastSummaryList">
                {Object.values(colorCombinationsList).map((item, index) => (
                <li key={"AA" + index} className="contrast-summary-list-item">
                    <div className="color-combo-circle" style={{borderRightColor: item.farge1, borderTopColor: item.farge2, borderBottomColor: item.farge1, borderLeftColor: item.farge2}}></div>
                    <div>
                        <p className="color-combo-text">{item.farge1}</p>
                        <p className="color-combo-text">{item.farge2}</p>    
                    </div>
                </li>
                ))}
           </ul>
	   :
	   <p className="no-elements">{t('no-elements')}</p>}
        </div>  
    </div>
  );
};
export default ContrastSummaryBox;

