import React from "react";
import "./style.css";
import { attitudes } from "./chat";
import ChatterBox from "./ChatterBox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import TextMenu from "./TextMenu";
import { Avatar, Box } from "@mui/material";
import SettingsPopover from "./SettingsPopover";
import { Close } from "@mui/icons-material";
import { useChatMachine } from "./machines/chatMachine";

export default function App() {
  const chatbot = useChatMachine();

  const {
    conversations,
    lang,
    tokens,
    temp,
    attitude,
    mode,
    listOpen,
    payload: sessionPayload,
    prompt: chatQuestion,
    setLang,
    setTokens,
    setTemp,
    setAttitude,
    setMode,
    setSpeak,
    setListOpen,
  } = chatbot;

  const setChatQuestion = (str) => chatbot.setState("prompt", str);

  const setChat = (payload) => {
    chatbot.send({
      type: "change conversation",
      payload,
    });
  };

  const renameConversation = React.useCallback(async (id, name) => {
    chatbot.send({
      type: "rename",
      name,
    });
  }, []);

  const deleteConversation = React.useCallback(async (id) => {
    chatbot.send({
      type: "remove",
      id,
    });
  }, []);

  const handleSubmit = async (event) => {
    !!event && event.preventDefault();
    chatbot.send("ask");
  };

  const createChat = () => {
    chatbot.send("new chat");
  };

  const chatProps = {
    chatbot,
    createChat,
    chatQuestion,
    setChatQuestion,
    handleSubmit,
    mode,
    setMode,
    setSpeak,
  };

  const settingsProps = {
    attitude,
    setAttitude,
    temp,
    setTemp,
    tokens,
    setTokens,
    lang,
    setLang,
  };

  return (
    <div>
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
          <Stack
            spacing={1}
            direction="row"
            sx={{ alignItems: "center", p: 1 }}
          >
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
              onClick={createChat}
              endIcon={<>➕</>}
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

          <Typography
            sx={{
              ml: 2,
            }}
            variant="subtitle2"
          >
            History
          </Typography>

          <ul>
            {Object.keys(conversations)
              .filter((key) => key !== sessionPayload.guid)
              .map((key) => (
                <li
                  className={!!conversations[key].agent ? "attach" : "normal"}
                  onClick={() => {
                    setChat(conversations[key]);
                  }}
                >
                  {conversations[key].title}{" "}
                </li>
              ))}
          </ul>
        </Stack>
      </Drawer>

      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
        <IconButton
          onClick={() => {
            setListOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            cursor: "pointer",
          }}
          src="./Chat.png"
          alt="logo"
        />

        <TextMenu
          active={!!sessionPayload.title}
          onChange={(name) => renameConversation(sessionPayload.guid, name)}
          onDelete={() => deleteConversation(sessionPayload.guid)}
          onCreate={createChat}
        >
          {sessionPayload.title || (
            <>
              Ask <b>Daystrom</b> anything!
            </>
          )}
        </TextMenu>
        <Box sx={{ flexGrow: 1 }} />
        <SettingsPopover items={attitudes} {...settingsProps} />
      </Stack>
      <ChatterBox {...chatProps} />
    </div>
  );
}
