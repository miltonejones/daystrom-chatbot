import {
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import AttachmentButton from "../styled/AttachmentButton";
import { Keyboard, Mic } from "@mui/icons-material";
import TextInput from "./TextInput";
import Flex from "../styled/Flex";
import processValue from "../util/processValue";

export const ChatStack = styled(Stack)(({}) => ({
  width: "calc(100vw - 32px)",
  position: "fixed",
  bottom: 0,
  left: 0,
  backgroundColor: "#fff",
  borderTop: "1px solid #e0e0e0",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px",
}));

export const LongCollapse = styled(Collapse)(({}) => ({
  width: "100vw",
}));

function ChatInput({
  chatbot,
  chatQuestion,
  setChatQuestion,
  talk,
  mode,
  setMode,
}) {
  const { contentText } = chatbot.state.context;

  return (
    <ChatStack direction="row">
      <LongCollapse orientation="horizontal" in={!chatbot.chatEnabled}>
        <Flex>
          <CircularProgress size={20} />
          Please wait... {processValue(chatbot.state.value)}
        </Flex>
      </LongCollapse>
      <Collapse
        orientation="horizontal"
        in={mode !== "voice" && chatbot.chatEnabled}
      >
        <TextInput
          chatbot={chatbot}
          chatQuestion={chatQuestion}
          setChatQuestion={setChatQuestion}
          contentText={contentText}
          setMode={setMode}
        />
      </Collapse>

      <LongCollapse
        orientation="horizontal"
        in={mode === "voice" && chatbot.chatEnabled}
      >
        <Stack
          direction="row"
          sx={{
            width: "calc(100vw - 2rem)",
            justifyContent: "space-between",
          }}
        >
          <AttachmentButton
            contentText={contentText}
            edge="end"
            fileLoaded={(object) => chatbot.setState("contentText", object)}
          />

          <IconButton
            sx={{
              color: "blue",
            }}
            onClick={talk}
          >
            <Mic />
          </IconButton>

          <IconButton onClick={() => setMode("text")}>
            <Keyboard />
          </IconButton>
        </Stack>
      </LongCollapse>
    </ChatStack>
  );
}

export default ChatInput;
