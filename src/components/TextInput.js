import { Box, IconButton } from "@mui/material";
import { HomepageTextField } from "../styled/HomepageTextField";
import AttachmentButton from "../styled/AttachmentButton";
import { Mic, Send } from "@mui/icons-material";
import ChatMenu from "./ChatMenu";
import React from "react";

function TextInput({
  chatbot,
  chatQuestion,
  setChatQuestion,
  contentText,
  setMode,
}) {
  const { chatHistory = [] } = chatbot.state.context;

  const [historyIndex, setHistoryIndex] = React.useState(chatHistory.length);

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && historyIndex > 0) {
      // up arrow
      setHistoryIndex(historyIndex - 1);
      setChatQuestion(chatHistory[historyIndex - 1]);
    } else if (e.keyCode === 40 && historyIndex < chatHistory.length) {
      // down arrow
      setHistoryIndex(historyIndex + 1);
      setChatQuestion(chatHistory[historyIndex + 1]);
    }
  };
  return (
    <Box sx={{ width: "calc(100vw - 2rem)" }}>
      <HomepageTextField
        autoComplete="off"
        fullWidth
        onChange={(e) => setChatQuestion(e.target.value)}
        value={chatQuestion}
        sx={{ minWidth: 360 }}
        size="small"
        placeholder="Ask me anything"
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: !!contentText ? (
            <ChatMenu onChange={(e) => setChatQuestion(e)} />
          ) : (
            <i />
          ),
          endAdornment: (
            <>
              {" "}
              <AttachmentButton
                edge="end"
                contentText={contentText}
                fileLoaded={(object) => chatbot.setState("contentText", object)}
              />
              <IconButton
                disabled={!chatQuestion}
                edge="end"
                onClick={() => chatbot.send("ask")}
              >
                <Send />
              </IconButton>
              <IconButton edge="end" onClick={() => setMode("voice")}>
                <Mic />
              </IconButton>
            </>
          ),
        }}
      />
    </Box>
  );
}

export default TextInput;
