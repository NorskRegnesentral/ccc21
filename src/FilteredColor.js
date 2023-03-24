class FilteredColor {

  /*
   * original:     The original color on canonical form #rrggbb             
   * filterType:   The type of color blindness filter
   * originalText: The original color as entered by user, that is, #rrggbb or #rgb (default: original)
   */
  
  constructor(original, filterType, originalText) {
    this.original = original;                                    
    this.filtered = original;                                    
    this.originalText = originalText ? originalText : original;  
    this.update(filterType);
  }

  update(filterType) {
    if (filterType === "protan") {
      this.filtered = protanFilter(this.original);
    } else if (filterType === "deutan") {
      this.filtered = deutanFilter(this.original);
    } else if (filterType === "tritan") {
      this.filtered = tritanFilter(this.original);
    } else {
      this.filtered = this.original;
    }
  }

}

// Protan filter mockup (just removes red component)
let protanFilter = (e) => {
  let s = "#";
  for (let i = 1; i < 7; i++) {
    s += (i === 1 || i === 2) ? '0' : e[i];
  }
  return s;
}

// Deutan filter mockup (just removes green component)
let deutanFilter = (e) => {
  let s = "#";
  for (let i = 1; i < 7; i++) {
    s += (i === 3 || i === 4) ? '0' : e[i];
  }
  return s;
}


// Tritan filter mockup (just removes blue component)
let tritanFilter = (e) => {
  let s = "#";
  for (let i = 1; i < 7; i++) {
    s += (i === 5 || i === 6) ? '0' : e[i];
  }
  return s;
}

export default FilteredColor;
