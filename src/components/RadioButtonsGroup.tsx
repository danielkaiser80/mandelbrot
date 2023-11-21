import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ChangeEvent, useState } from "react";

interface RadioButtonsGroupProps {
  heading: string;
  values: string[];
  handleChange: (newValue: string) => void;
}

const RadioButtonsGroup = ({
  heading,
  values,
  handleChange,
}: RadioButtonsGroupProps) => {
  const [value, setValue] = useState(values[0]);
  if (values.length === 0) return <></>;

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{heading}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={values[0]}
        name="radio-buttons-group"
        value={value}
        onChange={(_event: ChangeEvent<HTMLInputElement>, value: string) => {
          setValue(value);
          handleChange(value);
        }}
      >
        <>
          {values.map((element) => (
            <FormControlLabel
              value={element}
              control={<Radio />}
              label={element}
              key={element}
            />
          ))}
        </>
      </RadioGroup>
    </FormControl>
  );
};
export default RadioButtonsGroup;
