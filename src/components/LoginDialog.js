import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, Box, Stack } from "@mui/material";

const LoginDialog = ({ isOpen, handleClose, chatbot }) => {
  const { username, password, loggedin } = chatbot.state.context;

  const handleUsernameChange = (event) => {
    chatbot.setState("username", event.target.value);
  };

  const handlePasswordChange = (event) => {
    chatbot.setState("password", event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Submitted username: ${username}, password: ${password}`);
    chatbot.send("log in");
    // handleClose({ username, password });
  };

  const failed = chatbot.state.matches("login form.login failed");

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <Box>
        {/* {JSON.stringify(chatbot.state.value)} */}
        {!!failed && (
          <Alert severity="error">
            Your log in failed! Who are you??
            <Button
              onClick={() => {
                chatbot.send("retry");
              }}
            >
              try again
            </Button>
          </Alert>
        )}
        {/* {username + "," + password}
        {JSON.stringify(loggedin)} */}
        {!failed && (
          <Stack sx={{ p: 2 }} spacing={2}>
            <TextField
              size="small"
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
            />
            <TextField
              size="small"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            />
          </Stack>
        )}
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={failed} variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
