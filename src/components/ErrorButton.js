import React, { useContext } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export const ErrorButton = ({ chatbot }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRecover = () => {
    chatbot.send("recover");
    handleClose();
  };

  const handleCancel = () => {
    if (chatbot.state.can("cancel")) {
      chatbot.send("cancel");
    }
    handleClose();
  };

  // if (!chatbot.state.can("recover")) {
  //   return <i />;
  // }

  return (
    <>
      {/* <IconButton color="primary" onClick={() => setOpen(true)}>
        <ErrorIcon />
      </IconButton> */}

      <Dialog open={chatbot.state.can("recover")} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stack>
              <Typography>{chatbot.errorMessage}</Typography>

              {!!chatbot.diagnosis && (
                <fieldset>
                  <legend>Diagnosis</legend>
                  <Typography variant="caption">{chatbot.diagnosis}</Typography>
                </fieldset>
              )}
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {chatbot.unhealthy && (
            <Button
              variant="contained"
              color="error"
              onClick={() => chatbot.diagnose()}
            >
              diagnose
            </Button>
          )}
          <Button variant="contained" onClick={handleRecover}>
            okay
          </Button>
          {chatbot.state.can("cancel") && (
            <Button onClick={handleCancel}>Cancel</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
