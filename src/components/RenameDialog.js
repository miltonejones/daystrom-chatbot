import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function RenameDialog({ tempName, setTempName, open, onClose, onAccept }) {
  const handleAccept = () => {
    onAccept(tempName);
    setTempName("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rename Conversation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a new name for the conversation:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          size="small"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAccept} variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RenameDialog;
