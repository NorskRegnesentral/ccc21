import "./colorInput.css";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const ColorInput = ({
  colorValue,
  index,
  updateColorValue,
  removeColorValue,
}) => {
  const { t } = useTranslation();
  const [colorTextInput, setColorTextInput] = useState();
  useEffect(() => {
    setColorTextInput(colorValue);
  }, [colorValue]);

  //sjekker om det er syv karakterer (nok til en hex) og oppdaterer hvis hexkoden finnes.
  //hvis ikke setter vi verdien tilbake til det den var sist.
  let updateValue = (e) => {
    setColorTextInput(e.target.value);
    var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    if (e.target.value.length === 7 && RegExp.test(e.target.value))
      updateColorValue(index, e.target.value);
    if (e.target.value.length === 7 && !RegExp.test(e.target.value))
      setColorTextInput(colorValue);
  };

  return (
    <fieldset className="colorInput">
      <legend hidden>{colorValue}</legend>
      <button
        className="deleteInput"
        title={t('input-delete')}
        onClick={(e) => {{ removeColorValue({ index }) }}}> 
          x
      </button>
      <label for={t('color-value-by-colorpicker')} >    
        <input
          className="inputForColor"
          name={t('color-value-by-colorpicker')} //todo GI EN T('')
          type="color"
          value={colorValue}
          onInput={(e) => {{ updateColorValue(index, e.target.value);}}}
        ></input>
      </label> 
      <label for={t('color-value-by-text')}>
        <input
          className="inputForColor"
          type="text"
          id="hex-input"
          maxLength="7"
          value={colorTextInput}
          onChange={updateValue}
          name={t('color-value-by-text')}
        ></input>
      </label>
    </fieldset>
  );
};

export default ColorInput;
