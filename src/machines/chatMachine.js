import React from "react";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { getLocation } from "../util/getLocation";
import { attitudes, create, defineSys, generateText } from "../chat";
import dynamoStorage from "../hooks/DynamoStorage";
import { attachPreclick } from "../util/attachPreclick";
import useClipboard from "../hooks/useClipboard";
const COOKIE_NAME = "chat-conv-x";

const machine = createMachine(
  {
    id: "Daystrom chatbot",
    context: {
      userData: {},
      chatmem: [],
      lang: "en-US",
      tokens: 512,
      temp: 0.4,
      attitude: attitudes[0],
      mode: "voice",
      speak: true,
      conversations: {},
      payload: {},
    },
    initial: "Initial state",
    states: {
      "Initial state": {
        always: {
          target: "initialize engine",
        },
      },
      "initialize engine": {
        invoke: {
          src: "getUserData",
          id: "invoke-t4exj",
          onDone: [
            {
              target: "Accepting voice input",
              actions: {
                type: "assignUserData",
                params: {},
              },
            },
          ],
        },
      },

      "Accepting voice input": {
        entry: {
          type: "assignAsstTitle",
          params: {},
        },
        initial: "start voice recognition",
        states: {
          "start voice recognition": {
            invoke: {
              src: "startListening",
              id: "invoke-wnwh6",
            },
            on: {
              done: {
                target: "#Daystrom chatbot.pause for effect",
                actions: {
                  type: "assignPrompt",
                  params: {},
                },
              },
              "user talking": {
                actions: {
                  type: "assignTranscript",
                  params: {},
                },
                description: "Voice input is being transcribed",
                internal: true,
              },
            },
          },
          "user cancel": {
            invoke: {
              src: "stopListening",
              id: "invoke-26kga",
              onDone: [
                {
                  target: "#Daystrom chatbot.waiting for input",
                },
              ],
            },
          },
        },
        on: {
          cancel: {
            target: ".user cancel",
            internal: true,
          },
          timeout: {
            target: "waiting for input",
          },
        },
      },

      "Process chat prompt": {
        initial: "Append question to history",
        states: {
          "Append question to history": {
            entry: {
              type: "appendPrompt",
              params: {},
            },
            always: {
              target: "Send prompt to GPT",
            },
          },
          "Send prompt to GPT": {
            invoke: {
              src: "askGPT",
              id: "invoke-77067",
              onDone: [
                {
                  target: "#Daystrom chatbot.process chat response",
                  cond: "use silent response",
                  actions: {
                    type: "assignResponse",
                    params: {},
                  },
                },
                {
                  target: "#Daystrom chatbot.speak answer",
                  actions: {
                    type: "assignResponse",
                    params: {},
                  },
                },
              ],
            },
            on: {
              "stream response": {
                actions: {
                  type: "assignStreamText",
                  params: {},
                },
                description: "Chat response is being streamed from the server",
                internal: true,
              },
            },
          },
        },
      },

      "waiting for input": {
        description: "Screen is idle and waiting for command or mode change",
        initial: "pause for update",
        states: {
          "pause for update": {
            after: {
              500: [
                {
                  target:
                    "#Daystrom chatbot.waiting for input.update chat list",
                  actions: [],
                  meta: {},
                },
                {
                  internal: false,
                },
              ],
            },
          },
          "update chat list": {
            invoke: {
              src: "getConversations",
              id: "invoke-qjitx",
              onDone: [
                {
                  target: "ready",
                  actions: {
                    type: "assignConversations",
                    params: {},
                  },
                },
              ],
            },
          },
          ready: {
            description: "Apply any _onload_ scripts in the UI",
            invoke: {
              src: "interfaceLoaded",
              id: "invoke-7mzgn",
            },
          },
        },
        on: {
          "use voice": {
            target: "Accepting voice input",
          },
          "set state value": {
            actions: {
              type: "setProp",
              params: {},
            },
            description:
              "Update the value of any state parameter, including the chat prompt",
            internal: true,
          },
          ask: {
            target: "Process chat prompt",
          },

          rename: {
            target: "#Daystrom chatbot.process chat response.persist payload",
            actions: {
              type: "assignName",
              params: {},
            },
          },
          remove: {
            target: "#Daystrom chatbot.process chat response.persist payload",
            actions: {
              type: "removeChat",
              params: {},
            },
          },
          "new chat": {
            target: "clear chat session",
          },
          "change conversation": {
            target: ".pause for update",
            actions: {
              type: "assignConversation",
              params: {},
            },
            internal: true,
          },
        },
      },

      "process chat response": {
        initial: "get all conversations",
        states: {
          "get all conversations": {
            invoke: {
              src: "getConversations",
              id: "invoke-toe57",
              onDone: [
                {
                  target: "update payload",
                  cond: "payload has title",
                  actions: {
                    type: "assignConversations",
                    params: {},
                  },
                },
                {
                  target: "create payload",
                  actions: {
                    type: "assignConversations",
                    params: {},
                  },
                },
              ],
            },
          },
          "update payload": {
            invoke: {
              src: "updatePayload",
              onDone: [
                {
                  target: "persist payload",
                  actions: {
                    type: "assignPayload",
                    params: {},
                  },
                },
              ],
            },
          },
          "create payload": {
            invoke: {
              src: "createPayload",
              id: "invoke-ymy68",
              onDone: [
                {
                  target: "persist payload",
                  actions: {
                    type: "assignPayload",
                    params: {},
                  },
                },
              ],
            },
          },
          "persist payload": {
            invoke: {
              src: "persistPayload",
              id: "invoke-y0t8b",
              onDone: [
                {
                  target: "#Daystrom chatbot.waiting for input",
                },
              ],
            },
          },
        },
      },
      "clear chat session": {
        entry: {
          type: "clearSession",
          params: {},
        },
        always: {
          target: "Accepting voice input",
        },
      },
      "speak answer": {
        invoke: {
          src: "speakText",
          id: "invoke-j1yty",
          onDone: [
            {
              target: "process chat response",
            },
          ],
        },
      },
      "pause for effect": {
        description: "Pause to show the spoken text in the UI",
        after: {
          1000: [
            {
              target: "#Daystrom chatbot.Process chat prompt",
              actions: [],
              meta: {},
            },
            {
              internal: false,
            },
          ],
        },
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      assignUserData: assign((_, event) => ({
        userData: event.data,
      })),

      assignAsstTitle: assign(() => ({
        transcript: "",
        question:
          sarcasticQuestions[
            Math.floor(Math.random() * sarcasticQuestions.length)
          ],
      })),

      assignTranscript: assign((_, event) => ({
        transcript: event.text,
      })),

      assignPrompt: assign((context, event) => ({
        prompt: context.transcript,
        // transcript: "",
      })),

      setProp: assign((_, event) => ({
        [event.name]: event.value,
      })),

      removeChat: assign((context, event) => {
        const result = {
          chatmem: [],
          listOpen: true,
          contentText: "",
          payload: {},
          conversations: Object.keys(context.conversations)
            .filter((key) => key !== event.id)
            .reduce((out, key) => {
              out[key] = context.conversations[key];
              return out;
            }, {}),
        };
        return result;
      }),

      assignName: assign((context, event) => ({
        payload: {
          ...context.payload,
          title: event.name,
        },
        conversations: {
          ...context.conversations,
          [context.payload.guid]: {
            ...context.conversations[context.payload.guid],
            title: event.name,
          },
        },
      })),

      clearSession: assign((_, event) => ({
        listOpen: false,
        chatmem: [],
        payload: {},
      })),
      assignConversations: assign((_, event) => ({
        conversations: event.data,
      })),
      assignConversation: assign((_, event) => ({
        payload: event.payload,
        chatmem: event.payload.mem,
        contentText: event.payload.agent,
        listOpen: false,
      })),

      assignStreamText: assign((_, event) => {
        return {
          streamText: event.text,
        };
      }),

      assignPayload: assign((_, event) => {
        return {
          ...event.data.result,
        };
      }),

      assignResponse: assign((context, event) => {
        const res = event.data;
        const answer = res.choices[0].message;
        const loggedAnswer = { ...answer, timestamp: new Date().getTime() };

        return {
          streamText: null,
          chatmem: [...context.chatmem, loggedAnswer],
          voiceText: answer.content,
        };
      }),

      appendPrompt: assign((context, event) => {
        const chat = create(context.prompt);
        const query = [
          defineSys(
            context.contentText,
            context.attitude,
            context.lang,
            context.userData
          ),
          ...context.chatmem,
          chat,
        ];

        return {
          prompt: "",
          query,
          chat,
          chatmem: [...context.chatmem, chat],
        };
      }),
    },
    guards: {
      "payload has title": (context, event) => !!context.payload.title,
      "use silent response": (context, event) => !context.speak,
    },
    delays: {},
  }
);

export const useChatMachine = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  const store = dynamoStorage();

  const clipper = useClipboard();
  const attachClicks = React.useCallback(() => {
    const handleClick = (event) => {
      clipper.copy(event.target.innerText);
      event.target.classList.add("clicked");
      setTimeout(() => {
        event.target.classList.remove("clicked");
      }, 999);
    };
    attachPreclick(handleClick);
  }, [clipper]);

  const [state, send] = useMachine(machine, {
    services: {
      getUserData: async (context, event) => {
        const place = await getLocation();
        return place;
      },

      interfaceLoaded: () => {
        attachClicks();
      },

      askGPT: async (context) => {
        // Extract relevant data from context.
        const { query, tokens, temp } = context;

        // Generate text based on provided parameters.
        const responseText = await generateText(
          query,
          tokens,
          temp,
          handleStreamResponse
        );

        // Return the response in a structured format.
        return formatResponse(responseText);
      },

      startListening: () => {
        recognition.start();
      },
      stopListening: async () => {
        recognition.stop();
        return {};
      },

      getConversations: async () => {
        return JSON.parse((await store.getItem(COOKIE_NAME)) || "{}");
      },

      updatePayload: async (context) => {
        const payload = {
          ...context.payload,
          agent: context.contentText || context.payload.agent,
          mem: context.chatmem,
        };

        return {
          result: {
            payload,
            conversations: {
              ...context.conversations,
              [payload.guid]: payload,
            },
          },
        };
      },

      createPayload: async (context, event) => {
        const guid = generateGuid();
        const convo = [
          ...context.chatmem,
          create("create a short title for this conversation"),
        ];
        const res = await generateText(convo, 512);
        const answer = res.choices[0].message;
        const payload = {
          guid,
          agent: context.contentText || context.payload.agent,
          title: answer.content,
          mem: context.chatmem,
        };

        return {
          result: {
            sessionID: guid,
            payload,
            conversations: {
              ...context.conversations,
              [payload.guid]: payload,
            },
          },
        };
      },

      persistPayload: async (context, event) => {
        await store.setItem(COOKIE_NAME, JSON.stringify(context.conversations));
      },

      speakText: async (context, event) => {
        announceText(context.voiceText, context.lang);
      },
    },
  });

  recognition.interimResults = true;

  recognition.onerror = (event) => {
    send("timeout");
  };

  recognition.onend = (event) => {
    send("done");
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    send("user talking", { text });
  };

  const setState = (name, value) => {
    send("set state value", { name, value });
  };

  const [setLang, setTokens, setTemp, setAttitude, setMode] = Object.keys(
    defaultProps
  ).map((key) => (value) => {
    localStorage.setItem(key, value);
    setState(key, value);
  });

  React.useEffect(() => {
    Object.keys(defaultProps).map((key) => {
      const value = localStorage.getItem(key);
      !!value && setState(key, value);
    });
  }, []);

  const setSpeak = (val) => {
    localStorage.setItem("speak", val);
    setState("speak", val);
    !val && speechSynthesis.cancel();
  };

  const setListOpen = (val) => {
    setState("listOpen", val);
  };

  /**
   * Callback function to handle streaming response.
   *
   * @param {string} str - The string to log and send.
   */
  function handleStreamResponse(str) {
    // Send the response.
    send({
      type: "stream response",
      text: str,
    });
  }

  /**
   * Format the response for a chatbot interface.
   *
   * @param {string} text - The response text.
   * @returns {Object} - A structured response.
   */
  function formatResponse(text) {
    return {
      choices: [
        {
          message: {
            role: "assistant",
            content: text,
          },
        },
      ],
    };
  }

  return {
    ...state.context,
    state,
    send,

    // exposed helper methods
    setLang,
    setTokens,
    setTemp,
    setAttitude,
    setMode,
    setSpeak,
    setListOpen,
    setState,
  };
};

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

function announceText(speechText, lang) {
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

const sarcasticQuestions = [
  "What do you want, genius?",
  "Oh, it's you again. What?",
  "Surprise, surprise! What now?",
  "Spit it out!",
  "What is it this time?",
  "What'll it be?",
  "Lay it on me.",
  "What's your request?",
];

const defaultProps = {
  lang: "en-US",
  tokens: 512,
  temp: 0.4,
  attitude: attitudes[0],
  mode: "voice",
  speak: true,
};
