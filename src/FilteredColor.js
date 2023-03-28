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


// Color vision deficiency simulation filters

let protanFilter = (e) => {
  return rgbArrayToString(simulate_cvd(rgbStringToArray(e), "protan", 1.0));
}

let deutanFilter = (e) => {
  return rgbArrayToString(simulate_cvd(rgbStringToArray(e), "deutan", 1.0));
}

let tritanFilter = (e) => {
  return rgbArrayToString(simulate_cvd(rgbStringToArray(e), "tritan", 1.0));
}

// Conversion utilities

let rgbStringToArray = (str) => {
  let rgb = [0, 0, 0];
  rgb[0] = parseInt(str.slice(1,3), 16);
  rgb[1] = parseInt(str.slice(3,5), 16);
  rgb[2] = parseInt(str.slice(5,7), 16);
  return rgb;
}

let rgbArrayToString = (rgb) => {
  let str = "#";
  str += ("00" + Number(rgb[0]).toString(16)).substr(-2);
  str += ("00" + Number(rgb[1]).toString(16)).substr(-2);
  str += ("00" + Number(rgb[2]).toString(16)).substr(-2);
  return str;
}


// Brettel color vision deficiency simulation adapted from C code in
// https://github.com/DaltonLens/libDaltonLens/blob/master/libDaltonLens.c

const brettel_protan_params = { "rgbCvdFromRgb_1" : [0.14980, 1.19548, -0.34528,
                                                     0.10764, 0.84864, 0.04372,
                                                     0.00384, -0.00540, 1.00156],
                                "rgbCvdFromRgb_2" : [0.14570, 1.16172, -0.30742,
                                                     0.10816, 0.85291, 0.03892,
                                                     0.00386, -0.00524, 1.00139],
                                "separationPlaneNormalInRgb": [0.00048, 0.00393, -0.00441] };

const brettel_deutan_params = { "rgbCvdFromRgb_1" : [0.36477, 0.86381, -0.22858,
                                                     0.26294, 0.64245, 0.09462,
                                                     -0.02006, 0.02728, 0.99278],
                                "rgbCvdFromRgb_2" : [0.37298, 0.88166, -0.25464,
                                                     0.25954, 0.63506, 0.10540,
                                                     -0.01980, 0.02784, 0.99196],
                                "separationPlaneNormalInRgb": [-0.00281, -0.00611, 0.00892] };

const brettel_tritan_params = { "rgbCvdFromRgb_1" : [1.01277, 0.13548, -0.14826,
                                                     -0.01243, 0.86812, 0.14431,
                                                     0.07589, 0.80500, 0.11911],
                                "rgbCvdFromRgb_2" : [0.93678, 0.18979, -0.12657,
                                                     0.06154, 0.81526, 0.12320,
                                                     -0.37562, 1.12767, 0.24796],
                                "separationPlaneNormalInRgb": [0.03901, -0.02788, -0.01113] };

let linearRGB_from_sRGB = (v) => {
  let fv = v / 255.0;
  if (fv < 0.04045)
    return fv / 12.92;
  else
    return Math.pow((fv + 0.055) / 1.055, 2.4);
}

let sRGB_from_linearRGB = (v) => {
  if (v <= 0) return 0;
  if (v >= 1) return 255;
  if (v < 0.0031308)
    return Math.trunc(0.5 + (v * 12.92 * 255.0));
  else
    return Math.trunc(255.0 * (Math.pow(v, 1.0 / 2.4) * 1.055 - 0.055));
}

let simulate_cvd = (srgb, deficiency, severity) => {
  let linear_rgb = [0, 0, 0];
  let rgb_cvd = [0, 0, 0];
  let result = [0, 0, 0];
  let params;
  let n;
  let dotWithSepPlane;
  let rgbCvdFromRgb;

  if (deficiency === "protan") {
    params = brettel_protan_params;
  } else if (deficiency === "deutan") {
    params = brettel_deutan_params;
  } else if (deficiency === "tritan") {
    params = brettel_tritan_params;
  } else {
    return srgb;
  }
  // Convert from sRGB to linear RGB
  linear_rgb[0] = linearRGB_from_sRGB(srgb[0]);
  linear_rgb[1] = linearRGB_from_sRGB(srgb[1]);
  linear_rgb[2] = linearRGB_from_sRGB(srgb[2]);
  // Check on which plane we should project by comparing wih the separation plane normal.
  n = params.separationPlaneNormalInRgb;
  dotWithSepPlane = linear_rgb[0] * n[0] + linear_rgb[1] * n[1] + linear_rgb[2] * n[2];
  rgbCvdFromRgb = dotWithSepPlane >= 0 ? params.rgbCvdFromRgb_1 : params.rgbCvdFromRgb_2;
  // Do the matrix multiplication
  rgb_cvd[0] = rgbCvdFromRgb[0] * linear_rgb[0] + rgbCvdFromRgb[1] * linear_rgb[1] + rgbCvdFromRgb[2] * linear_rgb[2];
  rgb_cvd[1] = rgbCvdFromRgb[3] * linear_rgb[0] + rgbCvdFromRgb[4] * linear_rgb[1] + rgbCvdFromRgb[5] * linear_rgb[2];
  rgb_cvd[2] = rgbCvdFromRgb[6] * linear_rgb[0] + rgbCvdFromRgb[7] * linear_rgb[1] + rgbCvdFromRgb[8] * linear_rgb[2];
  // Apply the severity factor as a linear interpolation.
  // It's the same to do it in the RGB space or in the LMS space since it's a linear transform.
  rgb_cvd[0] = rgb_cvd[0] * severity + linear_rgb[0] * (1.0 - severity);
  rgb_cvd[1] = rgb_cvd[1] * severity + linear_rgb[1] * (1.0 - severity);
  rgb_cvd[2] = rgb_cvd[2] * severity + linear_rgb[2] * (1.0 - severity);
  // Encode as sRGB and return the result.
  result[0] = sRGB_from_linearRGB(rgb_cvd[0]);
  result[1] = sRGB_from_linearRGB(rgb_cvd[1]);
  result[2] = sRGB_from_linearRGB(rgb_cvd[2]);
  return result;
}

export default FilteredColor;
