import React from "react";
import { Avatar, Box, Card } from "@mui/material";
import useClipboard from "../hooks/useClipboard";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TimeStamp from "./TimeStamp";
import { Close, CopyAll, EditNote, Person, Sync } from "@mui/icons-material";
import ChatButton from "./ChatButton";
import { HomepageTextField } from "../styled/HomepageTextField";
import CurrentLocationMap from "./CurrentLocationMap";

const regex = /{[^}]+}/;

function extractLatLong(str) {
  // /{[\s\S]+}/;

  const match = str.match(regex);
  if (match) {
    // console.log({ match });
    try {
      const result = JSON.parse(match[0]);
      return result;
    } catch (e) {
      // alert(match[0]);
      // console.log({ error: match });
    }
  }
  return null;
}

function ChatNode({
  retry,
  rephrase,
  role,
  content: stuff,
  index,
  timestamp,
  loggedin,
  initials = "MJ",
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [innerText, setInnerText] = React.useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    rephrase(innerText, index);
    setIsEditing(false);
  };
  const { copy, copied } = useClipboard();
  const gps = extractLatLong(stuff);

  const mapLink = (map) =>
    `[this location](https://www.google.com/maps?q=${map.latitude},${map.longitude})`;
  const content = !gps ? stuff : stuff.replace(regex, mapLink(gps));

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
      {role !== "user" && <Avatar src="./Chat.png" alt="id" sizes="small" />}

      <Box>
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
          {" "}
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <HomepageTextField
                size="small"
                fullWidth
                autoFocus
                sx={{ width: "calc(100vw - 180px)" }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                value={innerText}
                onChange={(e) => setInnerText(e.target.value)}
              />
            </form>
          ) : (
            <>
              {" "}
              <ReactMarkdown>{content}</ReactMarkdown>
              {!!gps && <CurrentLocationMap {...gps} />}
            </>
          )}
          {role !== "user" && !!index && (
            <>
              <ChatButton icon={CopyAll} onClick={() => copy(content)}>
                {copied ? "Copied!" : "Copy"}
              </ChatButton>
              <ChatButton icon={Sync} onClick={() => retry(index)}>
                Retry
              </ChatButton>
            </>
          )}
          {role === "user" && (
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <ChatButton
                icon={isEditing ? Close : EditNote}
                onClick={() => {
                  setInnerText(content);
                  setIsEditing(!isEditing);
                }}
              >
                {isEditing ? "Cancel" : "Edit"}
              </ChatButton>
            </Box>
          )}
        </Card>
        <TimeStamp
          time={timestamp}
          align={role === "user" ? "right" : "left"}
        />
      </Box>

      {role === "user" && (
        <Avatar sizes="small"> {loggedin ? initials : <Person />}</Avatar>
      )}
    </Box>
  );
}

export default ChatNode;
