import React from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import MobileMenu from "../styled/MobileMenu";
import { promptLabels, promptPresets } from "../constants";

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
        {promptLabels.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleClose(promptPresets[option])}
          >
            {option}
          </MenuItem>
        ))}
      </MobileMenu>
    </div>
  );
};

export default ChatMenu;
