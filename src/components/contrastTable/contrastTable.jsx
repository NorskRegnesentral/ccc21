import "./contrastTable.css";
import React, { useState, useEffect } from "react";
import ColorChecker from "../../color-checker"; 


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
    //HER SKAL KONTRASTSJEKKEN INN
    if(rowIndex === columnIndex) return "egen farge, gir 0?"
    var jas = "r"+rowIndex+"c"+columnIndex; 
    //return getContrast(rowIndex,columnIndex);
    return jas;
  }

  //work in progress
  const getContrast = (rowIndex, columnIndex) => {
    const color1 =  tableList[columnIndex];
    const color2 = tableList[rowIndex];

    const contrast = ColorChecker.checkColors(color1, color2);
    console.log(contrast)
    return contrast;
  }

  return (
    <div className="contrastTable">
        <table>
            <tbody>
                {tableList.map((color, rowIndex) => (
                <tr key={"row"+rowIndex}>
                    {tableList.map((color, colIndex) => (
                        <td  style={{backgroundColor: getCellColor(rowIndex,colIndex)}}>{getCellValue(rowIndex, colIndex)}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default ContrastTable;
