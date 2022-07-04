import "./contrastTable.css";
import React, { useState, useEffect } from "react";
import {checkColors} from "../../color-checker"; 

const ContrastTable = ({colorList}) => {
  const [tableList, setTableList] = useState([]);
  const [contrastColors] = useState({none:"#F2B8B8",AA:"#F2E9B8",AAA:"#B7F1B7"});

  //tabell-listen skal alltid være den samme som fargelisten, 
  //men med ett tomt felt først
  useEffect(() => {
    setTableList([""].concat(colorList));
  },[colorList]);

  const getCellColorFromHex = (rowIndex, columnIndex) => {
    if(rowIndex === 0) return tableList[columnIndex];
    else if (columnIndex === 0) return tableList[rowIndex];
    return; 
  }

  const getCellColorFromContrast = (rowIndex, columnIndex) => {
    if(rowIndex === 0 || columnIndex === 0 || rowIndex === columnIndex) return "";
    const color1 =  tableList[columnIndex];
    const color2 = tableList[rowIndex];
    const contrast = checkColors(color1, color2).contrast; 
    if(contrast < 4.5) return contrastColors.none;
    if(4.5 <= contrast && contrast < 7.0) return contrastColors.AA;
    return contrastColors.AAA; 
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
                        <td key={rowIndex+colIndex} style={{'backgroundColor': getCellColorFromContrast(rowIndex,colIndex)}}><div style={{'backgroundColor': getCellColorFromHex(rowIndex,colIndex)}} className="colorBox"/><div>{getCellValue(rowIndex, colIndex)}</div></td> //sett backgroundcolor i ytterste div for full dekning
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default ContrastTable;
