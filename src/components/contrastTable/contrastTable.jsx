import "./contrastTable.css";
import React, { useState, useEffect } from "react";

const ContrastTable = ({colorList}) => {
    const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(Object.keys(colorList).length)
  },[colorList]);

  return (
    <div className="contrastTable">
        <h1>Tabell med størrelse {size}</h1>
        <table>
            {colorList.map((color, index) => (
              <tr key={"color"+index+color}>{color}</tr>
            ))}

        </table>
    </div>
  );
};

export default ContrastTable;
