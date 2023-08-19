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
import AttachmentIcon from "@mui/icons-material/Attachment";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import moment from "moment";
import { Avatar } from "@mui/material";

export const CHATSTATE = {
  IDLE: 0,
  INITIALIZED: 1,
  VISIBLE: 2,
};

function YourComponent({
  contentText,
  setContentText,
  chatQuestion,
  setChatQuestion,
  speak,
  setSpeak,
  talk,
}) {
  const [mode, setMode] = React.useState("voice");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 3072) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContentText({
          name: file.name,
          size: file.size,
          text: e.target.result,
        });
      };
      reader.readAsText(file);
    }
  };

  if (mode === "voice") {
    return (
      <Stack
        direction="row"
        sx={{
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
    );
  }

  return (
    <TextField
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
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".txt, .json, .js, .py" // Updated this line
              onChange={handleFileChange}
            />
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
              <IconButton
                edge="end"
                onClick={() => fileInputRef.current.click()}
              >
                <AttachmentIcon />
              </IconButton>
            )}

            <IconButton edge="end" onClick={() => setSpeak(!speak)}>
              {speak ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
            <IconButton onClick={() => setMode("voice")}>
              <MicIcon />
            </IconButton>
          </>
        ),
      }}
    />
  );
}

const ChatterBox = ({
  chatMem,
  // setRefresh,
  querying,
  chatQuestion,
  setChatQuestion,
  selectedProperty,
  handleSubmit,
  show,
  setShow,
  ...props
}) => {
  const [offset, setOffset] = React.useState(80);

  const bottom = show & CHATSTATE.VISIBLE ? 10 : -1000;
  const quiet = () => {
    setShow((s) => Number(s) + CHATSTATE.INITIALIZED + CHATSTATE.VISIBLE);
  };

  const talk = () => setShow(CHATSTATE.IDLE);

  const textProps = {
    chatQuestion,
    setChatQuestion,
    talk,
    ...props,
  };

  return (
    <>
      {show === CHATSTATE.IDLE && (
        <VoiceInput
          onComplete={quiet}
          onChat={(q) => {
            // alert(q);
            // setChatQuestion(() => q);
            handleSubmit(null, q);
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          bottom,
          transition: "all 0.3s linear",
          right: 10,
          width: "calc(100vw - 20px)",
          height: `calc(100vh - ${offset}px)`,
          overflow: "hidden",
        }}
      >
        <Card
          sx={{
            p: 1,
          }}
        >
          {!!querying && <LinearProgress />}

          <Box
            sx={{
              mb: 1,
              height: `calc(100vh - ${offset + 60}px)`,
              overflow: "scroll",
            }}
          >
            {chatMem.map((c, m) => (
              <ChatText key={m} {...c} />
            ))}
            {/* 
            <TextField
              size="small"
              onChange={(e) => setOffset(Number(e.target.value))}
              value={offset}
            /> */}
          </Box>

          <form onSubmit={handleSubmit}>
            <YourComponent {...textProps} />
          </form>
        </Card>
      </div>
    </>
  );
};

function ChatText({ role, content, timestamp }) {
  return (
    <Box
      sx={{
        gap: 1,
        display: "flex",
        m: 1,
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
      <Box
        sx={{
          backgroundColor: (t) =>
            role === "user" ? t.palette.primary.light : t.palette.grey[200],
          color: (t) =>
            role === "user" ? t.palette.common.white : t.palette.grey[900],
          borderRadius: 2,
          maxWidth: "100%",
          p: 1,
          overflow: "auto",
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </Box>
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
