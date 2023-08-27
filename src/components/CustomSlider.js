import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import generateMarks from "../util/generateMarks";

function CustomSlider({ value, min, max, step, binary, onChange }) {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);

    if (binary) {
      const valueInBinary = Math.pow(2, newValue);
      onChange(valueInBinary);
    } else {
      onChange(newValue);
    }
  };

  return (
    <Slider
      marks={generateMarks(min, max, step, binary)}
      value={sliderValue}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      valueLabelDisplay="auto"
    />
  );
}

export default CustomSlider;
