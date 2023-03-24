class FilteredColor {

  /*
   * original: The original color on canonical form #rrggbb             
   * filtered: The filtered color on canonical form #rrggbb             
   * originalText: The original color as entered by user, that is, #rrggbb or #rgb (default: original)
   */
  
  constructor(original, filterType, originalText) {
    this.original = original;                                    
    this.filtered = original;                                    
    this.originalText = originalText ? originalText : original;  
    this.update(filterType);
  }

  update(filterType) {
    if (filterType === "red") {
      this.filtered = redFilter(this.original);
    } else if (filterType === "green") {
      this.filtered = greenFilter(this.original);
    } else if (filterType === "blue") {
      this.filtered = blueFilter(this.original);
    } else {
      this.filtered = this.original;
    }
  }

}

let redFilter = (e) => {
  let s = "#";
  for (let i = 1; i < 7; i++) {
    s += (i === 1 || i === 2) ? '0' : e[i];
  }
  return s;
}

let greenFilter = (e) => {
  let s = "#";
  for (let i = 1; i < 7; i++) {
    s += (i === 3 || i === 4) ? '0' : e[i];
  }
  return s;
}

let blueFilter = (e) => {
  let s = "#";
  for (let i = 1; i < 7; i++) {
    s += (i === 5 || i === 6) ? '0' : e[i];
  }
  return s;
}

export default FilteredColor;
