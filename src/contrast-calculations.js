// SPDX-License-Identifier: GPL-3.0-or-later

import { checkColors } from "./color-checker";
import { defaultColorPalette } from "./variables";
import FilteredColor from "./FilteredColor";

export const getContrastList = (contrastMatrix, minContrast, maxContrast) => {
  const list = [];
  for (let row in contrastMatrix) {
    for (let column in contrastMatrix) {
      //IKKE ER LOV MED DOBLE ENTRIES
      /*console.log("row", row, "col", column, "val", contrastMatrix[row][column])*/
      const farge1 = contrastMatrix[row][0];
      const farge2 = contrastMatrix[0][column];
      const kontrastverdi = contrastMatrix[row][column];
      if (column === row) {
        continue;
      }
      if (
        list.some(
          (e) =>
            (e.farge1 === farge2 && e.farge2 === farge1) ||
            (e.farge1 === farge1 && e.farge2) === farge2
        )
      ) {
        continue;
      }
      if (!(kontrastverdi >= minContrast && kontrastverdi < maxContrast)) {
        continue;
      }
      list.push({
        farge1: farge1,
        farge2: farge2,
        kontrastverdi: kontrastverdi,
      });
    }
  }
  return list;
};

export const getColorsFromDefaultPalette = (numberOfColors, currentColorList, filterType) => {
  let colors = [];
  if(numberOfColors === 1){
    let possibleColor = getRandomColor();
    while(Object.values(currentColorList).map(c => { return c.original }).includes(possibleColor)){
      possibleColor = getRandomColor();
    }
    colors.push(new FilteredColor(possibleColor, filterType))
  } 
  if(numberOfColors > 1 && numberOfColors <= defaultColorPalette.length){
    while (colors.length < numberOfColors) colors.push(new FilteredColor(defaultColorPalette[colors.length], filterType))
  }

  return colors; 
}

export const getBlackOrWhiteAsBestContrast = (color, filterType) => {
  const white = "#fcfcfc";
  const black = "#1f1235";
  const contrastToBlack = checkColors(color.filtered, "#000000");
  return contrastToBlack.contrast > 7 ? new FilteredColor(black, filterType) : new FilteredColor(white, filterType); 
}

const getRandomColor = () => {
  return defaultColorPalette[Math.floor(Math.random() * defaultColorPalette.length)];
}
