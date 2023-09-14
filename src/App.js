import React from "react";
import "./style.css";
import { composure } from "./chat";
import ChatterBox from "./ChatterBox";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import TextMenu from "./TextMenu";
import { Box } from "@mui/material";
import SettingsPopover from "./SettingsPopover";
import { useChatMachine } from "./hooks/useChatMachine";
import SideDrawer from "./SideDrawer";
import { ErrorButton } from "./components/ErrorButton";
import StyledAvatar from "./styled/StyledAvatar";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ChoiceDialog from "./components/ChoiceDialog";
import CredentialsList from "./components/CredentialsList";

export default function App() {
  const chatbot = useChatMachine();

  const {
    mode,
    payload,
    prompt: chatQuestion,
    setMode,
    setSpeak,
    setListOpen,
  } = chatbot;

  const setChatQuestion = (str) => chatbot.setState("prompt", str);

  const renameConversation = React.useCallback(async (name) => {
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

  return (
    <div>
      <SideDrawer chatbot={chatbot} />

      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }} spacing={1}>
        <IconButton
          disabled={!chatbot.stateEnabled}
          onClick={() => setListOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <StyledAvatar src="./Chat.png" alt="logo" />

        <TextMenu
          active={!!payload.title}
          onChange={renameConversation}
          onDelete={() => deleteConversation(payload.guid)}
          onCreate={createChat}
        >
          {payload.title || (
            <>
              Ask <b>Daystrom</b> anything!
            </>
          )}
        </TextMenu>
        <Box sx={{ flexGrow: 1 }} />
        <SettingsPopover items={composure} chatbot={chatbot} />
        <ErrorButton chatbot={chatbot} />
      </Stack>

      <CredentialsList chatbot={chatbot} />

      <ChatterBox {...chatProps} />
      <ChoiceDialog chatbot={chatbot} />
      <ForgotPasswordForm chatbot={chatbot} />
    </div>
  );
}
