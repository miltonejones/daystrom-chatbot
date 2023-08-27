import React, { useState } from "react";
import { MenuItem, Typography, Stack } from "@mui/material";
import TinyButton from "./styled/TinyButton";
import { ExpandMore } from "@mui/icons-material";
import MobileMenu from "./styled/MobileMenu";
import DeleteDialog from "./components/DeleteDialog";
import RenameDialog from "./components/RenameDialog";

function TextMenu({ active, children: text, onChange, onDelete, onCreate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [tempName, setTempName] = useState(text);

  const handleOpenMenu = (event) => {
    !!active && setAnchorEl(event.currentTarget);
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

  const handleCreateClick = () => {
    onCreate();
    handleCloseMenu();
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

  const sx = active
    ? {
        cursor: "pointer",
        lineHeight: 1,
        fontWeight: active ? 600 : 400,
        "&:hover": {
          color: (th) => th.palette.primary.dark,
        },
      }
    : { lineHeight: 1 };
  return (
    <div>
      <Stack>
        <Typography variant="caption" sx={{ color: "red", lineHeight: 1 }}>
          <b>Daystrom Chatbot</b>
        </Typography>
        <Typography variant="body2" sx={sx} onClick={handleOpenMenu}>
          {text} {active && <TinyButton icon={ExpandMore} />}
        </Typography>
      </Stack>

      <MobileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleRenameClick}>Rename conversation</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete conversation</MenuItem>
        <MenuItem onClick={handleCreateClick}>New chat</MenuItem>
      </MobileMenu>

      <RenameDialog
        open={openModal}
        onClose={handleModalClose}
        onAccept={handleModalAccept}
        tempName={tempName}
        setTempName={setTempName}
      />

      <DeleteDialog
        open={openConfirm}
        onClose={handleConfirmClose}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default TextMenu;
