import React, { useRef } from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VoiceInput from "./VoiceInput";
import ReactMarkdown from "react-markdown";
import MicIcon from "@mui/icons-material/Mic";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import moment from "moment";
import { Avatar, Collapse, Fab, styled } from "@mui/material";
import { CopyAll, Mic, Sync } from "@mui/icons-material";
import useClipboard from "./hooks/useClipboard";
import AttachmentButton from "./styled/AttachmentButton";
import { keyframes } from "@emotion/react";
import TinyButton from "./styled/TinyButton";

// Define the keyframes for the pulsate animation
const pulsate = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

const HomepageTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: 30,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputAdornment-positionEnd": {
    marginRight: 8,
  },
  "& .MuiInputAdornment-root": {
    color: "rgba(0, 0, 0, 0.54)",
  },
}));
export const CHATSTATE = {
  IDLE: 0,
  INITIALIZED: 1,
  VISIBLE: 2,
};

function ChatInput({
  chatbot,
  chatQuestion,
  setChatQuestion,

  setSpeak,
  talk,
  mode,
  setMode,
}) {
  const { contentText, speak } = chatbot.state.context;

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
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
              endAdornment: (
                <>
                  {!!contentText ? (
                    <Card
                      sx={{
                        p: (t) => t.spacing(0.5, 1),
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            lineHeight: 1.1,
                          }}
                          variant="caption"
                        >
                          {contentText.name.substr(0, 16)}...
                        </Typography>
                        <Typography
                          sx={{
                            lineHeight: 1,
                            fontSize: "0.6rem",
                          }}
                          variant="caption"
                        >
                          {contentText.size} bytes
                        </Typography>
                      </Stack>
                    </Card>
                  ) : (
                    <AttachmentButton
                      edge="end"
                      fileLoaded={(object) =>
                        chatbot.setState("contentText", object)
                      }
                    />
                  )}

                  <IconButton edge="end" onClick={() => setSpeak(!speak)}>
                    {speak ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </IconButton>
                  <IconButton edge="end" onClick={() => setMode("voice")}>
                    <MicIcon />
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
          <IconButton onClick={() => setSpeak(!speak)}>
            {speak ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
          <IconButton
            sx={{
              color: "blue",
            }}
            onClick={talk}
          >
            <MicIcon />
          </IconButton>

          <IconButton onClick={() => setMode("text")}>
            <KeyboardIcon />
          </IconButton>
        </Stack>
      </Collapse>
    </Stack>
  );
}

const ChatterBox = ({
  chatbot,
  chatQuestion,
  setChatQuestion,
  handleSubmit,
  createChat,
  ...props
}) => {
  // const [offset, setOffset] = React.useState(80);
  const offset = 80;

  const modeListening = ["pause for effect", "Accepting voice input"].some(
    chatbot.state.matches
  );
  const querying = ["initialize engine", "Process chat prompt"].some(
    chatbot.state.matches
  );

  const bottom = 10; // !modeListening ? 10 : -1000;

  const talk = () => chatbot.send("use voice");

  const textProps = {
    chatbot,
    chatQuestion,
    setChatQuestion,
    talk,
    ...props,
  };

  return (
    <>
      {modeListening && <VoiceInput chatbot={chatbot} />}

      <div
        style={{
          transition: "all 0.3s linear",
          outline: "dotted 1px purple",
          width: "calc(100vw - 20px)",
          height: `calc(100vh - ${offset}px)`,
          overflow: "hidden",
        }}
      >
        <Card
          sx={{
            p: 1,
            outline: "dotted 3px green",
            height: "calc(100vh - 40px)",
          }}
          elevation={6}
          variant="elevation"
        >
          {!!querying && <LinearProgress />}

          <Box
            sx={{
              mb: 1,
              height: `calc(100vh - ${offset + 60}px)`,
              overflow: "scroll",
              outline: "dotted 1px red",
            }}
          >
            {!chatbot.chatmem.length && (
              <EmptyChat chatbot={chatbot} onClick={createChat} />
            )}
            {chatbot.chatmem.map((c, m) => (
              <ChatText
                key={m}
                index={m}
                {...c}
                retry={(index) =>
                  chatbot.send({
                    type: "retry",
                    index,
                  })
                }
              />
            ))}
            {!!chatbot.streamText && (
              <ChatText
                role="assistant"
                content={chatbot.streamText}
                timestamp={new Date().getTime()}
              />
            )}
          </Box>

          <form onSubmit={handleSubmit}>
            <ChatInput {...textProps} />
          </form>
        </Card>
      </div>
    </>
  );
};

const EmptyChat = ({ onClick, chatbot }) => {
  const ready2Chat = chatbot.state.matches("waiting for input");
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Typography>
        {ready2Chat
          ? "Click here to ask any question."
          : "Ask your question when ready..."}
      </Typography>
      <Fab
        onClick={onClick}
        disabled={!ready2Chat}
        color="primary"
        sx={{
          width: 94,
          height: 94,
          mt: 2,
        }}
      >
        <Mic />
      </Fab>
      <Typography
        variant="caption"
        sx={{
          mt: 2,
          color: (t) => t.palette.grey[600],
          textAlign: "center",
        }}
      >
        ChatGPT may produce inaccurate information about people, places, or
        facts.
      </Typography>
    </Stack>
  );
};

function ChatText({ retry, role, content, index, timestamp }) {
  const { copy, copied } = useClipboard();
  return (
    <Box
      sx={{
        gap: 1,
        display: "flex",
        m: 2,
        flexDirection: "row",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
      }}
    >
      {role !== "user" && (
        <Avatar src="./Chat.png" alt="id" sizes="small">
          MJ
        </Avatar>
      )}
      {role === "user" && <TimeStamp time={timestamp} />}
      <Card
        sx={{
          backgroundColor: (t) =>
            role === "user" ? `rgb(0, 122, 255)` : `rgb(0, 166, 78)`,
          color: (t) => t.palette.common.white,
          borderRadius: 2,
          maxWidth: "100%",
          p: 1,
          overflow: "auto",
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
        {role !== "user" && !!index && (
          <>
            <Typography
              sx={{ pt: 2, cursor: "pointer" }}
              onClick={() => copy(content)}
              variant="caption"
            >
              <TinyButton icon={CopyAll} />
              {copied ? "Copied!" : "Copy"}
            </Typography>
            <Typography
              sx={{ pt: 2, cursor: "pointer" }}
              onClick={() => retry(index)}
              variant="caption"
            >
              <TinyButton icon={Sync} />
              Retry
            </Typography>
          </>
        )}
      </Card>
      {role !== "user" && <TimeStamp time={timestamp} />}
      {role === "user" && <Avatar sizes="small">MJ</Avatar>}
    </Box>
  );
}

function TimeStamp({ time }) {
  if (isNaN(time)) return <i />;
  return (
    <Typography
      sx={{
        whiteSpace: "nowrap",
        color: (t) => t.palette.grey[500],
      }}
      variant="caption"
    >
      {formatTime(time)}
    </Typography>
  );
}

function formatTime(ms) {
  const timestamp = moment(ms);

  // Check if the timestamp is from today
  if (moment().isSame(timestamp, "day")) {
    return timestamp.format("hh:mm a");
  } else {
    return timestamp.format("ddd hh:mm a");
  }
}

export default ChatterBox;
