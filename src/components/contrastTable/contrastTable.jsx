import "./contrastTable.css";
import React, { useState, useEffect } from "react";

const ContrastTable = ({colorList}) => {
    //vet ikke om denne trengs
    const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(Object.keys(colorList).length)
  },[colorList]);

  const getCellValue = (rowIndex, columnIndex) => {
    console.log("getting value for ", rowIndex, columnIndex);
    if(rowIndex === 0) return colorList[columnIndex];
    else if (columnIndex === 0) return colorList[rowIndex];
    var jas = "r"+rowIndex+"c"+columnIndex; 
    return jas;
  }

  return (
    <div className="contrastTable">
        <table>
            <tbody>
                {colorList.map((color, rowIndex) => (
                <tr key={"row"+rowIndex}>
                    {colorList.map((color, colIndex) => (
                        <td>{getCellValue(rowIndex, colIndex)}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default ContrastTable;
