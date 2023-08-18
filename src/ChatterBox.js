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

import AttachmentIcon from "@mui/icons-material/Attachment";

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
}) {
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
              <Stack
                sx={{
                  border: (theme) => `solid 1px ${theme.palette.info.light}`,
                  borderRadius: `0.25rem`,
                  p: (t) => t.spacing(0, 1),
                }}
              >
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                  variant="caption"
                >
                  <b>{contentText.name.substr(0, 10)}...</b>
                </Typography>
                <Typography variant="caption">
                  {contentText.size} bytes
                </Typography>
              </Stack>
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
  const [speak, setSpeak] = React.useState(true);

  const bottom = show & CHATSTATE.VISIBLE ? 10 : -1000;

  const textProps = {
    chatQuestion,
    setChatQuestion,
    speak,
    setSpeak,
    ...props,
  };

  return (
    <>
      {show === CHATSTATE.IDLE && (
        <VoiceInput
          onComplete={() => {
            setShow(
              (s) => Number(s) + CHATSTATE.INITIALIZED + CHATSTATE.VISIBLE
            );
          }}
          onChat={(q) => {
            // alert(q);
            // setChatQuestion(() => q);
            handleSubmit(null, q);
          }}
        />
      )}

      <div
        style={{
          zIndex: 2000,
          position: "fixed",
          bottom,
          transition: "all 0.3s linear",
          right: 10,
          width: "calc(100vw - 20px)",
          height: "calc(100vh - 180px)",
          overflow: "hidden",
        }}
      >
        <Card
          sx={{
            p: 1,
          }}
        >
          <Box
            sx={{
              mb: 1,
              height: "calc(100vh - 240px)",
              overflow: "scroll",
            }}
          >
            {chatMem.map((c, m) => (
              <ChatText key={m} {...c} />
            ))}
          </Box>

          {!!querying && <LinearProgress />}

          <form onSubmit={handleSubmit}>
            <YourComponent {...textProps} />
          </form>
        </Card>
      </div>
    </>
  );
};

function ChatText({ role, content }) {
  return (
    <Box
      sx={{
        display: "flex",
        m: 1,
        flexDirection: "row",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          backgroundColor: (t) =>
            role === "user" ? t.palette.primary.light : t.palette.grey[200],
          color: (t) =>
            role === "user" ? t.palette.common.white : t.palette.grey[900],
          borderRadius: 2,
          p: 1,
        }}
      >
        <Typography variant="body2"> {content}</Typography>
      </Box>
    </Box>
  );
}

export default ChatterBox;
