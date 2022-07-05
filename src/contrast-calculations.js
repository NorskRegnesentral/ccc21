export const getContrastList = (contrastMatrix, minContrast, maxContrast) => {
  const list = [];
  for (let row in contrastMatrix) {
    for (let column in contrastMatrix) {
      //IKKE ER LOV MED DOBLE ENTRIES
      /*console.log("row", row, "col", column, "val", contrastMatrix[row][column])*/
      const farge1 = contrastMatrix[row][0];
      const farge2 = contrastMatrix[0][column];
      const kontrastverdi = contrastMatrix[row][column];

      const objectWithOpositeVal = {
        farge1: farge2,
        farge2: farge1,
        kontrastverdi: kontrastverdi,
      };

      console.log(
        "finnes motsatt: ",
        list.includes(objectWithOpositeVal),
        objectWithOpositeVal,
        " i liste",
        list
      );
      if (column === row) {
        continue;
      }
      if (list.some((e) => e.farge1 === farge2 && e.farge2 === farge1)) {
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

      /*list.push(
        column == row
          ? ""
          : list.some((e) => e.farge1 === farge2 && e.farge2 == farge1)
          ? ""
          : kontrastverdi >= minContrast && kontrastverdi < maxContrast
          ? {
              farge1: farge1,
              farge2: farge2,
              kontrastverdi: kontrastverdi,
            }
          : ""
      );*/
    }
  }
  return list;
};
