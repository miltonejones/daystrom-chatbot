import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, Box, IconButton, Stack, Typography } from "@mui/material";
import MobileMenu from "../styled/MobileMenu";
import Flex from "../styled/Flex";
import { Close } from "@mui/icons-material";

const LoginDialog = ({ chatbot }) => {
  const { username, password } = chatbot.state.context;

  const isOpen = ["login form", "create account"].some(chatbot.state.matches);
  const newLogin = chatbot.state.matches("create account.show form");
  const successful = chatbot.state.matches("create account.creation success");
  const creatingLogin = chatbot.state.matches("create account.submit details");

  const handleClose = () => chatbot.send("cancel");

  const handleTextChange = (event) => {
    chatbot.setState(event.target.name, event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Submitted username: ${username}, password: ${password}`);
    chatbot.send(newLogin ? "submit" : "log in");
  };

  const failed = chatbot.state.matches("login form.login failed error");
  const caption = newLogin
    ? "Create a new username and password."
    : "Enter your username and password";

  const createProps = [
    {
      label: "Name",
      name: "fullname",
      hide: !newLogin,
    },
    {
      label: "Email",
      name: "email",
      hide: !newLogin,
    },
    {
      label: "Username",
      name: "username",
      hide: !!failed,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      // hide: !!failed,
    },
  ];
  return (
    <MobileMenu component={Dialog} open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Flex sx={{ alignItems: "baseline" }}>
          <Stack>
            <Typography>{newLogin ? "Create Account" : "Login"}</Typography>
            <Typography variant="caption"> {caption}</Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="small" onClick={() => chatbot.send("cancel")}>
            <Close />
          </IconButton>
        </Flex>
      </DialogTitle>

      {!(successful || creatingLogin) && (
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

          <Stack sx={{ p: 2 }} spacing={2}>
            {createProps
              .filter((prop) => !prop.hide)
              .map((prop) => (
                <TextField
                  size="small"
                  {...prop}
                  type={prop.type || "text"}
                  value={chatbot[prop.name]}
                  onChange={handleTextChange}
                  fullWidth
                />
              ))}
            {chatbot.state.can("forgot password") && (
              <Flex>
                <Box sx={{ flexGrow: 1 }} />
                <Flex
                  link
                  onClick={() => chatbot.send("forgot password")}
                  variant="caption"
                >
                  Forgot password
                </Flex>
              </Flex>
            )}
          </Stack>
        </Box>
      )}

      {!!creatingLogin && (
        <Stack>
          <Alert>Please wait...</Alert>
        </Stack>
      )}

      {!!successful && (
        <Stack>
          <Alert>Account created!</Alert>
        </Stack>
      )}

      <DialogActions>
        <Flex sx={{ width: "100%" }}>
          {chatbot.state.can("new account") && (
            <Button onClick={() => chatbot.send("new account")}>
              Create Account
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={failed} variant="contained" onClick={handleSubmit}>
            {newLogin ? "Create Account" : "Log In"}
          </Button>
        </Flex>
      </DialogActions>
    </MobileMenu>
  );
};

export default LoginDialog;
