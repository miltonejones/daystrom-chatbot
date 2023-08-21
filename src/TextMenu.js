import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import TinyButton from "./styled/TinyButton";
import { ExpandMore } from "@mui/icons-material";

function TextMenu({ children: text, onChange, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
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
    setOpenConfirm(true);
    handleCloseMenu();
  };

  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setOpenConfirm(false);
  };

  // const handleDeleteClick = () => {
  //   onDelete();
  //   handleCloseMenu();
  // };

  return (
    <div>
      <Stack>
        <Typography variant="caption" sx={{ color: "red", lineHeight: 1 }}>
          <b>Daystrom Chatbot</b>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            lineHeight: 1,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={handleOpenMenu}
        >
          {text} <TinyButton icon={ExpandMore} />
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
            size="small"
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
          <Button onClick={handleModalAccept} variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirm} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TextMenu;
