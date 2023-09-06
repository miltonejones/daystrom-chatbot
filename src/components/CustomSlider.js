import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import generateMarks from "../util/generateMarks";
import { Stack, Typography } from "@mui/material";

function CustomSlider({ value, min, max, step, binary, label, onChange }) {
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
    <Stack>
      <Typography sx={{ mt: 1.5 }} variant="caption">
        {label}
      </Typography>
      <Slider
        marks={generateMarks(min, max, step, binary)}
        value={sliderValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
}

export default CustomSlider;
