import { ChangeEvent, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Input as MuiInput,
  Slider,
  Typography,
} from "@mui/material";

const Input = styled(MuiInput)`
  width: 42px;
`;

interface InputSliderProps {
  description: string;
  handleChange: (value: number) => void;
  minValue: number;
  maxValue?: number;
  initialValue?: number;
  step?: number;
}

const InputSlider = ({
  description,
  handleChange,
  minValue,
  maxValue = 100,
  initialValue = maxValue,
  step = 1,
}: InputSliderProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? minValue : Number(event.target.value));
  };

  useEffect(() => {
    handleChange(value);
  }, [value, handleChange]);

  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  return (
    <Box sx={{ width: 250, border: 1, padding: 2 }}>
      <Typography id="input-slider" gutterBottom>
        {description}
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : minValue}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            step={step}
            marks
            min={minValue}
            max={maxValue}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min: minValue,
              max: maxValue,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default InputSlider;
