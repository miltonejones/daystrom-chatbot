import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import SettingsDrawer from "./components/SettingsDrawer";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import LoginDialog from "./components/LoginDialog";
import MobileMenu from "./styled/MobileMenu";
import { AccountCircle, Lock, Settings } from "@mui/icons-material";

const SettingsPopover = ({ items, chatbot }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [loginOpen, setLoginOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const loginOpen = chatbot.state.matches("login form");
  const local = window.location.href.indexOf("localhost") > 0;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSettingsOpen(null);
    setAnchorEl(null);
  };

  const handleMenuClick = () => {
    setSettingsOpen(true);
    setAnchorEl(null);
  };

  const handleCredentialsClick = () => {
    chatbot.setState("creds", !chatbot.creds);
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    // setLoginOpen(true);
    chatbot.send(chatbot.loggedin ? "sign out" : "sign in");
    handleMenuClose();
    setAnchorEl(null);
  };

  const handleLoginClose = () => {
    // setLoginOpen(false);
    chatbot.send("cancel");
  };

  const handleSelectChange = (event) => {
    chatbot.setAttitude(event.target.value);
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <SettingsIcon />
      </IconButton>
      <MobileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {!!chatbot.fullname && (
          <Typography
            variant="caption"
            sx={{ p: (t) => t.spacing(2, 0, 0, 2) }}
          >
            Logged in as "{chatbot.fullname}"
          </Typography>
        )}

        <MenuItem onClick={handleLoginOpen}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          {chatbot.loggedin ? "Log out" : "Log in"}
        </MenuItem>

        <MenuItem onClick={handleMenuClick}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        {!!local && (
          <MenuItem onClick={handleCredentialsClick}>
            <ListItemIcon>
              <Lock fontSize="small" />
            </ListItemIcon>
            Credentials
          </MenuItem>
        )}
      </MobileMenu>

      <SettingsDrawer
        items={items}
        isOpen={settingsOpen}
        chatbot={chatbot}
        handlePopoverClose={handleMenuClose}
        handleSelectChange={handleSelectChange}
      />

      <LoginDialog
        isOpen={loginOpen}
        handleClose={handleLoginClose}
        chatbot={chatbot}
      />
    </Box>
  );
};

export default SettingsPopover;
