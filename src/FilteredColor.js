class FilteredColor {

  constructor(original, filterType) {
    this.original = original;
    this.filtered = original;
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
