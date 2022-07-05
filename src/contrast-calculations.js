
export const getContrastList = (contrastMatrix, minContrast, maxContrast) => {
    const list = []; 


    for(let row in contrastMatrix){
        for(let column in contrastMatrix){ 
            //LEGG TIL AT DIAGONALE IKKE KOMMER MED I LISTEN OG DET IKKE ER LOV MED DOBLE ENTRIES
            
            //console.log("row", row, "col", column, "val", contrastMatrix[row][column])
            const val = contrastMatrix[row][column]
            const yolo = "farge1 " + contrastMatrix[row][0] + " farge2 " + contrastMatrix[0][column] + " value " + contrastMatrix[row][column]
            list.push(val >= minContrast && val <= maxContrast ? yolo : "" )
        }
      }
    return list; 

}

