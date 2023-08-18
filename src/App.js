import React from "react";
import "./style.css";
import { defineSys, create, generateText } from "./chat";
import ChatterBox, { CHATSTATE } from "./ChatterBox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
// import { AWS_CONFIG } from "./config";

// import AWS from "aws-sdk";
// const S3_BUCKET = "aptjson";

// AWS.config.update(AWS_CONFIG);

const COOKIE_NAME = "chat-conv";

function generateGuid() {
  let guid = "";
  for (let i = 0; i < 11; i++) {
    let randomNum = Math.floor(Math.random() * 16);
    if (randomNum < 10) {
      guid += randomNum;
    } else {
      guid += String.fromCharCode(randomNum + 87);
    }
  }
  return guid;
}

export default function App() {
  const [chatQuestion, setChatQuestion] = React.useState();
  const [chatMem, setChatMem] = React.useState([]);
  const [querying, setQuerying] = React.useState(false);
  const [sessionID, setSessionID] = React.useState(false);
  const [sessionPayload, setPayload] = React.useState({});
  const [listOpen, setListOpen] = React.useState(false);
  const [show, setShow] = React.useState(CHATSTATE.IDLE);
  const [speak, setSpeak] = React.useState(true);
  const [contentText, setContentText] = React.useState(""); // State to save the content of the file

  const setChat = (convo) => {
    setChatMem(convo.mem);
    setContentText(convo.agent);
    setPayload(convo);
    setListOpen(false);
    setShow((s) => Number(s) + CHATSTATE.VISIBLE);
  };

  const persistConversation = React.useCallback(
    async (mem, innerText) => {
      const pl = JSON.parse(localStorage.getItem(COOKIE_NAME) || "{}");

      if (sessionPayload.title) {
        setPayload((l) => {
          const load = {
            ...l,
            agent: innerText || l.agent,
            mem,
          };

          Object.assign(pl, {
            [l.guid]: load,
          });
          localStorage.setItem(COOKIE_NAME, JSON.stringify(pl));
          return load;
        });
        return; // alert('Nothing to see here');
      }

      const guid = generateGuid();
      setSessionID(() => guid);
      const convo = [
        ...mem,
        create("come up with a short title for this conversation"),
      ];
      const res = await generateText(convo, 512);
      const answer = res.choices[0].message;

      setPayload((e) => {
        const payload = {
          guid,
          agent: innerText || e.agent,
          title: answer.content,
          mem,
        };
        Object.assign(pl, {
          [payload.guid]: payload,
        });
        localStorage.setItem(COOKIE_NAME, JSON.stringify(pl));
        return payload;
      });

      return guid;
    },
    [sessionID, sessionPayload]
  );

  const handleSubmit = async (event, question) => {
    !!event && event.preventDefault();
    const isFirstQuestion = chatMem.length === 0;
    // alert(isFirstQuestion.toString());
    const chat = create(question || chatQuestion);
    const query = [defineSys(contentText), ...chatMem, chat];
    setChatQuestion("");

    setChatMem((c) => [...c, chat]);
    setQuerying(true);
    const res = await generateText(query, 512);
    const answer = res.choices[0].message;

    setQuerying(false);

    persistConversation([...chatMem, chat, answer], contentText);

    setChatMem((c) => [...c, answer]);

    !!speak && speakText(answer.content);
  };

  const chatProps = {
    chatMem,
    setChatMem,
    chatQuestion,
    setChatQuestion,
    handleSubmit,
    querying,
    contentText,
    show,
    setShow,
    setContentText,
    speak,
    setSpeak,
  };

  const convos = JSON.parse(localStorage.getItem(COOKIE_NAME) || "{}");
  // return <pre>{JSON.stringify(convos, 0, 2)}</pre>;

  return (
    <div>
      <Drawer
        open={listOpen}
        anchor="left"
        onClose={() => {
          setListOpen(false);
          setShow((s) => Number(s) + CHATSTATE.VISIBLE);
        }}
      >
        <Stack
          sx={{
            width: "75vw",
            maxWidth: 400,
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
            <IconButton
              onClick={() => {
                setListOpen(false);
                setShow((s) => Number(s) + CHATSTATE.VISIBLE);
              }}
            >
              <MenuIcon />
            </IconButton>{" "}
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setShow(0);
                setPayload({});
                setContentText("");
                setListOpen(false);
                setChatMem([]);
              }}
            >
              ➕ New Chat
            </Button>
          </Stack>

          <ul>
            {Object.keys(convos).map((key) => (
              <li
                className={!!convos[key].agent ? "attach" : "normal"}
                onClick={() => {
                  setChat(convos[key]);
                }}
              >
                {convos[key].title}{" "}
              </li>
            ))}
          </ul>
        </Stack>
      </Drawer>

      <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
        <IconButton
          onClick={() => {
            setListOpen(true);
            setShow((s) => Number(s) - CHATSTATE.VISIBLE);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography>{sessionPayload.title || "Untitled chat"}</Typography>
      </Stack>

      <ChatterBox {...chatProps} />
    </div>
  );
}

function speakText(speechText) {
  // Check if speech synthesis is supported in the browser
  if ("speechSynthesis" in window) {
    // Create a new SpeechSynthesisUtterance object
    var utterance = new SpeechSynthesisUtterance(speechText);

    // Use the default speech synthesis voice
    utterance.voice = speechSynthesis.getVoices()[0];
    // Set the language to US English (en-US)
    utterance.lang = "en-US";

    // Start speaking the text
    speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis is not supported in this browser.");
  }
}
