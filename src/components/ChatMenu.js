import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import MobileMenu from "../styled/MobileMenu";

const options = ["Explain This", "Clean Up This Code", "Translate To..."];

const ChatMenu = ({ onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    !!option && onChange(option);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <MobileMenu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => handleClose()}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </MobileMenu>
    </div>
  );
};

export default ChatMenu;
