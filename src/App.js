import React from "react";
import "./style.css";
import { defineSys, create, generateText, attitudes } from "./chat";
import ChatterBox, { CHATSTATE } from "./ChatterBox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import TextMenu from "./TextMenu";
import { Avatar, Box } from "@mui/material";
import SettingsPopover from "./SettingsPopover";
import { useS3 } from "./hooks/useS3";
import { Close } from "@mui/icons-material";

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

const defaultProps = {
  lang: "en-US",
  tokens: 512,
  temp: 0.4,
  attitude: attitudes[0],
  mode: "voice",
  speak: true,
};

export default function App() {
  const [settings, setSettings] = React.useState(defaultProps);
  const [setLang, setTokens, setTemp, setAttitude, setMode] = Object.keys(
    defaultProps
  ).map((key) => (value) => {
    localStorage.setItem(key, value);
    setSettings((s) => ({ ...s, [key]: value }));
  });

  const setSpeak = (val) => {
    localStorage.setItem("speak", val);
    setSettings((s) => ({ ...s, speak: val }));
    !val && speechSynthesis.cancel();
  };

  const { lang, tokens, temp, attitude, speak, mode } = settings;

  React.useEffect(() => {
    Object.keys(defaultProps).map((key) => {
      const value = localStorage.getItem(key);
      !!value && setSettings((s) => ({ ...s, [key]: value }));
    });
  }, []);

  const [chatQuestion, setChatQuestion] = React.useState();
  const [chatMem, setChatMem] = React.useState([]);
  const [querying, setQuerying] = React.useState(false);
  const [sessionID, setSessionID] = React.useState(false);
  const [sessionPayload, setPayload] = React.useState({});
  const [listOpen, setListOpen] = React.useState(false);
  const [show, setShow] = React.useState(CHATSTATE.IDLE);
  const [contentText, setContentText] = React.useState("");

  // const { saveChat, files } = useS3();

  const persistChat = (obj) => {
    localStorage.setItem(COOKIE_NAME, JSON.stringify(obj));
    // saveChat(obj);
  };

  const setChat = (convo) => {
    setChatMem(convo.mem);
    setContentText(convo.agent);
    setPayload(convo);
    setListOpen(false);
    setShow(CHATSTATE.INITIALIZED + CHATSTATE.VISIBLE);
  };

  const renameConversation = React.useCallback((id, name) => {
    const pl = JSON.parse(localStorage.getItem(COOKIE_NAME) || "{}");
    pl[id].title = name;
    persistChat(pl);
    setPayload(pl[id]);
  }, []);

  const deleteConversation = React.useCallback((id) => {
    const pl = JSON.parse(localStorage.getItem(COOKIE_NAME) || "{}");
    delete pl[id];
    persistChat(pl);

    // setShow(0);
    setPayload({});
    setContentText("");
    setListOpen(true);
    setChatMem([]);
  }, []);

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
          persistChat(pl);
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
        persistChat(pl);
        return payload;
      });

      return guid;
    },
    [sessionID, sessionPayload]
  );

  /**
   * Handles form submission and generates a response based on the given question.
   * @async
   * @param {Event} event - The form submission event.
   * @param {string} question - The question to generate a response for.
   */
  const handleSubmit = async (event, question) => {
    // If an event is provided, prevent the default form submission behavior.
    !!event && event.preventDefault();

    // Create a chat object with the given question or a default question.
    const chat = create(question || chatQuestion);

    // Define a query with system metadata, chat history, and the current chat object.
    const query = [defineSys(contentText, attitude, lang), ...chatMem, chat];

    // Clear the chat question state.
    setChatQuestion("");

    // Add the chat object to the chat history state.
    setChatMem((c) => [...c, chat]);

    // Set the querying state to true.
    setQuerying(true);

    // Generate a response based on the query and tokens.
    const res = await generateText(query, tokens, temp);

    // Set the querying state to false.
    setQuerying(false);

    // Get the first response choice and its message.
    const answer = res.choices[0].message;

    // Add a timestamp to the answer and create a logged answer object.
    const loggedAnswer = { ...answer, timestamp: new Date().getTime() };

    // Persist the conversation with the new chat and logged answer objects.
    persistConversation([...chatMem, chat, loggedAnswer], contentText);

    // Add the logged answer object to the chat history state.
    setChatMem((c) => [...c, loggedAnswer]);

    // If speak is truthy, speak the answer content in the specified language.
    !!speak && speakText(answer.content, lang);
  };

  // const handleSubmit = async (event, question) => {
  //   !!event && event.preventDefault();

  //   const chat = create(question || chatQuestion);
  //   const query = [defineSys(contentText, attitude, lang), ...chatMem, chat];
  //   setChatQuestion("");

  //   setChatMem((c) => [...c, chat]);
  //   setQuerying(true);

  //   const res = await generateText(query, tokens);

  //   setQuerying(false);

  //   const answer = res.choices[0].message;
  //   const loggedAnswer = { ...answer, timestamp: new Date().getTime() };
  //   persistConversation([...chatMem, chat, loggedAnswer], contentText);
  //   setChatMem((c) => [...c, loggedAnswer]);
  //   !!speak && speakText(answer.content, lang);
  // };

  // const cm = chatMem;
  // const content = await generateText(query, 512, (portions) => {
  //   console.log({ portions });
  //   setChatMem([...cm, portions]);
  // });

  // const answer = {
  //   content,
  //   role: "assistant",
  // };

  const createChat = () => {
    setShow(0);
    setPayload({});
    setContentText("");
    setListOpen(false);
    setChatMem([]);
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
    createChat,
    mode,
    setMode,
  };

  const settingsProps = {
    attitude,
    setAttitude,
    temp,
    setTemp,
    tokens,
    setTokens,
    lang,
    setLang,
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
          setShow(() => CHATSTATE.INITIALIZED + CHATSTATE.VISIBLE);
        }}
      >
        <Stack
          sx={{
            width: "75vw",
            maxWidth: 400,
          }}
        >
          <Stack
            spacing={1}
            direction="row"
            sx={{ alignItems: "center", p: 1 }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                cursor: "pointer",
              }}
              src="./Chat.png"
              alt="logo"
            />

            <b
              onClick={() => {
                setListOpen(false);
              }}
              style={{ color: "red " }}
            >
              <u>Daystrom</u>
            </b>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="outlined"
              size="small"
              onClick={createChat}
              endIcon={<>➕</>}
            >
              New Chat
            </Button>
            <IconButton
              onClick={() => {
                setListOpen(false);
              }}
            >
              <Close />
            </IconButton>
          </Stack>
          <Typography
            sx={{
              ml: 2,
            }}
            variant="subtitle2"
          >
            History
          </Typography>

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

      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
        <IconButton
          onClick={() => {
            setListOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            cursor: "pointer",
          }}
          src="./Chat.png"
          alt="logo"
        />
        {JSON.stringify(show)}
        <TextMenu
          onChange={(name) => renameConversation(sessionPayload.guid, name)}
          onDelete={() => deleteConversation(sessionPayload.guid)}
        >
          {sessionPayload.title || (
            <>
              Ask <b>Daystrom</b> anything!
            </>
          )}
        </TextMenu>
        <Box sx={{ flexGrow: 1 }} />
        <SettingsPopover items={attitudes} {...settingsProps} />
      </Stack>
      {/* <pre>{JSON.stringify(sessionPayload, 0, 2)}</pre> */}
      <ChatterBox {...chatProps} />
    </div>
  );
}

function speakText(speechText, lang) {
  // Check if speech synthesis is supported in the browser
  if ("speechSynthesis" in window) {
    // Create a new SpeechSynthesisUtterance object
    var utterance = new SpeechSynthesisUtterance(speechText);

    // Use the default speech synthesis voice
    utterance.voice = speechSynthesis.getVoices()[0];
    // Set the language to US English (en-US)
    utterance.lang = lang;

    // Start speaking the text
    speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis is not supported in this browser.");
  }
}
