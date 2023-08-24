import { Box, Collapse, IconButton, Stack } from "@mui/material";
import { HomepageTextField } from "../styled/HomepageTextField";
import AttachmentButton from "../styled/AttachmentButton";
import { Keyboard, Mic } from "@mui/icons-material";
import ChatMenu from "./ChatMenu";

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
        justifyContent: "space-between",
        padding: "8px 16px",
      }}
    >
      <Collapse orientation="horizontal" in={mode !== "voice"}>
        <Box
          sx={{
            width: "calc(100vw - 2rem)",
          }}
        >
          <HomepageTextField
            autoComplete="off"
            fullWidth
            onChange={(e) => setChatQuestion(e.target.value)}
            value={chatQuestion}
            sx={{ minWidth: 360 }}
            size="small"
            placeholder="Ask me anything"
            InputProps={{
              startAdornment: !!contentText ? (
                <ChatMenu onChange={(e) => setChatQuestion(e)} />
              ) : (
                <i />
              ),
              endAdornment: (
                <>
                  <AttachmentButton
                    edge="end"
                    contentText={contentText}
                    fileLoaded={(object) =>
                      chatbot.setState("contentText", object)
                    }
                  />

                  <IconButton edge="end" onClick={() => setMode("voice")}>
                    <Mic />
                  </IconButton>
                </>
              ),
            }}
          />
        </Box>
      </Collapse>

      <Collapse
        sx={{
          width: "100vw",
        }}
        orientation="horizontal"
        in={mode === "voice"}
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
