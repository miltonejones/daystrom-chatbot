import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

function TextMenu({ children: text, onChange, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [tempName, setTempName] = useState(text);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRenameClick = () => {
    setTempName(text);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalAccept = () => {
    onChange(tempName);
    setOpenModal(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    handleCloseMenu();
  };

  return (
    <div>
      <Stack>
        <Typography variant="caption" sx={{ color: "red", lineHeight: 1 }}>
          <b>Daystrom Chatbot</b>
        </Typography>
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", lineHeight: 1 }}
          onClick={handleOpenMenu}
        >
          {text}
        </Typography>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogContent>
          <DialogContentText>Please enter a new name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleModalAccept} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TextMenu;
