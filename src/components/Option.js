import { FormControlLabel, Switch } from "@mui/material";

export const Option = ({ value, onChange }) => {
  const handleToggle = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={handleToggle}
            name="autoOpen"
            color="primary"
          />
        }
        label={value ? "ON" : "OFF"}
      />
    </div>
  );
};
