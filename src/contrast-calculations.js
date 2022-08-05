// SPDX-License-Identifier: GPL-3.0-or-later

import { checkColors } from "./color-checker";
import { defaultColorPalette } from "./variables";

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

export const getColorsFromDefaultPalette = (numberOfColors, currentColorList) => {
  let colors = [];
  if(numberOfColors === 1){
    /*if(currentSizeOfColorList < 2) colors.push(defaultPalette[Math.floor(Math.random() * defaultPalette.length)]);
    else colors.push(defaultPalette[currentSizeOfColorList+1]);*/
    let possibleColor = defaultColorPalette[Math.floor(Math.random() * defaultColorPalette.length)]
    if(Object.values(currentColorList).includes(possibleColor)){
      while(Object.values(currentColorList).includes(possibleColor)){
        possibleColor = defaultColorPalette[Math.floor(Math.random() * defaultColorPalette.length)]

      }
    }
    colors.push(possibleColor)
  } 
  if(numberOfColors > 1 && numberOfColors <= defaultColorPalette.length){
    while (colors.length < numberOfColors) colors.push(defaultColorPalette[colors.length])
  }

  return colors; 
}

export const getBlackOrWhiteAsBestContrast = (color) => {
  const white = "#fcfcfc";
  const black = "#1f1235";
  const contrastToBlack = checkColors(color, "#000000");
  return contrastToBlack.contrast > 7 ? black : white; 
}