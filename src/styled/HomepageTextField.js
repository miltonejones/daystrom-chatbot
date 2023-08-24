import { TextField, styled } from "@mui/material";

export const HomepageTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: 30,
    // backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputAdornment-positionEnd": {
    marginRight: 8,
  },
  "& .MuiInputAdornment-root": {
    color: "rgba(0, 0, 0, 0.54)",
  },
}));
