import React from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import ConversationList from "./ConversationList";

function SideDrawer(props) {
  const { chatbot } = props;
  const { listOpen, setListOpen, payload: sessionPayload } = chatbot;

  return (
    <Drawer
      open={listOpen}
      anchor="left"
      onClose={() => {
        setListOpen(false);
      }}
    >
      <Stack
        sx={{
          width: "75vw",
          maxWidth: 400,
        }}
      >
        <Stack spacing={1} direction="row" sx={{ alignItems: "center", p: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              cursor: "pointer",
            }}
            src="./Chat.png"
            alt="logo"
          />

          <b
            onClick={() => {
              setListOpen(false);
            }}
            style={{ color: "red " }}
          >
            <u>Daystrom</u>
          </b>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="outlined"
            size="small"
            onClick={() => chatbot.send("new chat")}
            startIcon={<Add />}
          >
            New Chat
          </Button>
          <IconButton
            onClick={() => {
              setListOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </Stack>

        {!!sessionPayload.title && (
          <>
            <Typography
              sx={{
                ml: 2,
              }}
              variant="subtitle2"
            >
              Current conversation
            </Typography>

            <ul>
              <li className="normal selected">{sessionPayload.title}</li>
            </ul>
          </>
        )}

        <ConversationList chatbot={chatbot} />
      </Stack>
    </Drawer>
  );
}

export default SideDrawer;
