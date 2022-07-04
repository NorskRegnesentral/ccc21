import "./contrastTable.css";
import React, { useState, useEffect } from "react";
import {checkColors} from "../../color-checker"; 

const ContrastTable = ({colorList}) => {
  const [tableList, setTableList] = useState([]);

  //tabell-listen skal alltid være den samme som fargelisten, 
  //men med ett tomt felt først
  useEffect(() => {
    setTableList([""].concat(colorList));
  },[colorList]);

  const getCellColor = (rowIndex, columnIndex) => {
    if(rowIndex === 0) return tableList[columnIndex];
    else if (columnIndex === 0) return tableList[rowIndex];
    return; 
  }

  const getCellValue = (rowIndex, columnIndex) => {
    if(rowIndex === 0) return tableList[columnIndex];
    else if (columnIndex === 0) return tableList[rowIndex];
    if(rowIndex === columnIndex) return "" //returnerer tom fordi det er samme fargene
    return getContrast(rowIndex,columnIndex); 
  }

  //bruker den importerte metoden fra color API 
  const getContrast = (rowIndex, columnIndex) => {
    const color1 =  tableList[columnIndex];
    const color2 = tableList[rowIndex];

    const contrast = checkColors(color1, color2); 
    return contrast.contrast; //contrast har mange verdier. Console.log for å se alle muligheter:)
  }

  return (
    <div className="contrastTable">
        <table>
            <tbody>
                {tableList.map((color, rowIndex) => (
                <tr key={"row"+rowIndex}>
                    {tableList.map((color, colIndex) => (
                        <td key={rowIndex+colIndex}  style={{backgroundColor: getCellColor(rowIndex,colIndex)}}>{getCellValue(rowIndex, colIndex)}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default ContrastTable;
