import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Stack, Typography } from "@mui/material";

const propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  children: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  children: null,
};

/**
 * A reusable dropdown select component using Material UI components.
 * @param {Object} props - The props object containing the label, items, children, value, and onChange.
 * @returns A dropdown select input with options.
 */
const DropdownSelect = ({ label, items, children, value, onChange }) => {
  return (
    <Stack>
      <Typography sx={{ mt: 1.5 }} variant="caption">
        {children}
      </Typography>
      <TextField
        select
        size="small"
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

DropdownSelect.propTypes = propTypes;
DropdownSelect.defaultProps = defaultProps;

export default DropdownSelect;
