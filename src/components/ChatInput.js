import { CircularProgress, Collapse, IconButton, Stack } from "@mui/material";
import AttachmentButton from "../styled/AttachmentButton";
import { Keyboard, Mic } from "@mui/icons-material";
import TextInput from "./TextInput";
import Flex from "../styled/Flex";

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
    <Stack
      direction="row"
      sx={{
        width: "calc(100vw - 32px)",
        position: "fixed",
        bottom: 0,
        left: 0,
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
      }}
    >
      <Collapse
        sx={{
          width: "100vw",
        }}
        orientation="horizontal"
        in={!chatbot.chatEnabled}
      >
        <Flex>
          <CircularProgress size={20} />
          Please wait...
        </Flex>
      </Collapse>
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

      <Collapse
        sx={{
          width: "100vw",
        }}
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
      </Collapse>
    </Stack>
  );
}

export default ChatInput;
