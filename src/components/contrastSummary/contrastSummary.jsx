import "./contrastSummary.css";
import React, { useState, useEffect } from "react";
import {getContrastList} from "../../contrast-calculations"; 

const ContrastSummary = ({contrastMatrix}) => {
  const [contrastColors] = useState({none:"#F2B8B8",AA:"#F2E9B8",AAA:"#B7F1B8"}); //endre her hvis andre farger er ønskelig!
  const [AAAContrasts, setAAAContrasts] = useState(getContrastList(contrastMatrix, 4.51, 21));
  const [AAContrasts, setAAContrasts] = useState(getContrastList(contrastMatrix, 1.01, 4.5));
  const [badContrasts, setBadContrasts] = useState(getContrastList(contrastMatrix, 1 , 1));


  useEffect(() =>{
    setBadContrasts("")
    setBadContrasts(getContrastList(contrastMatrix, 1 , 1));
    setAAContrasts(getContrastList(contrastMatrix, 1.01, 4.5));
    setAAAContrasts(getContrastList(contrastMatrix, 4.51, 21));
  }, [contrastMatrix])


  return (
    <div className="contrastTable">
        <h2>Supre kontraster</h2>
        <ul>
            {Object.values(AAAContrasts).map((item, index) =>(
                <li key={item}>{item}</li>
            ))}
        </ul>

        <h2>Ok kontraster</h2>
        <ul>
            {Object.values(AAContrasts).map((item, index) =>(
                <li key={item}>{item}</li>
            ))}
        </ul>

        <h2>Dårlige kontraster</h2>
        <ul>
            {Object.values(badContrasts).map((item, index) =>(
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
  );
};
export default ContrastSummary;
