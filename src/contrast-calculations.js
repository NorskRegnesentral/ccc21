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
  const defaultPalette = [ "#1f1235", "#ffffff", "#ff6e6c", "#f3f3f3", "#e3615f", "#fbdd74", "#67568c", "#f4effc", "#1b1425" ]
  let colors = [];
  if(numberOfColors === 1){
    /*if(currentSizeOfColorList < 2) colors.push(defaultPalette[Math.floor(Math.random() * defaultPalette.length)]);
    else colors.push(defaultPalette[currentSizeOfColorList+1]);*/
    console.log("type",typeof(currentColorList))
    let possibleColor = defaultPalette[Math.floor(Math.random() * defaultPalette.length)]
    if(Object.values(currentColorList).includes(possibleColor)){
      console.log("entry is in both")
      while(Object.values(currentColorList).includes(possibleColor)){
        possibleColor = defaultPalette[Math.floor(Math.random() * defaultPalette.length)]

      }
    }
    colors.push(possibleColor)
  } 
  if(numberOfColors > 1 && numberOfColors <= defaultPalette.length){
    while (colors.length < numberOfColors) colors.push(defaultPalette[colors.length])
  }

  return colors; 
}