import React from "react";
import "./style.css";
import { composure } from "./chat";
import ChatterBox from "./ChatterBox";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import TextMenu from "./TextMenu";
import { Avatar, Box } from "@mui/material";
import SettingsPopover from "./SettingsPopover";
import { useChatMachine } from "./machines/chatMachine";
import SideDrawer from "./SideDrawer";

export default function App() {
  const chatbot = useChatMachine();

  const {
    lang,
    tokens,
    temp,
    attitude,
    mode,
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
    chatbot,
  };

  return (
    <div>
      <SideDrawer chatbot={chatbot} />

      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }} spacing={1}>
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
        <SettingsPopover items={composure} {...settingsProps} />
      </Stack>

      <ChatterBox {...chatProps} />
    </div>
  );
}
