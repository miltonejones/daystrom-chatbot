import React from "react";
import { useMachine } from "@xstate/react";
import { create } from "../chat";
import { chatMachine } from "../machines/chatMachine";
import { announceText } from "../util/announceText";
import { attachPreclick } from "../util/attachPreclick";
import { generateGuid } from "../util/generateGuid";
import { getLocation } from "../util/getLocation";
import dynamoStorage from "./DynamoStorage";
import useClipboard from "./useClipboard";
import { defaultProps } from "../machines/actions/chatActions";
import { getAddressFromLatLng } from "../util/getAddressFromLatLng";
import { generateText } from "../util/generateText";
import { useTriage } from "./useTriage";
const COOKIE_NAME = "chat-conv-x";

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

  const triage = useTriage();

  const [state, send] = useMachine(chatMachine, {
    services: {
      getUserData: async () => {
        const place = await getLocation();
        return place;
      },

      interfaceLoaded: () => {
        attachClicks();
      },
      processLogin: async (context) => {
        const ok =
          context.username === "mjones" && context.password === "admin";
        if (!ok) {
          throw new Error("log in failed");
        }
        return true;
      },
      getGoogleLocation: async (context) => {
        // alert(JSON.stringify(context.userData));
        return await getAddressFromLatLng(context.userData);
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

      getConversations: async (context) => {
        const json = context.loggedin
          ? await store.getItem(COOKIE_NAME)
          : localStorage.getItem(COOKIE_NAME);

        return JSON.parse(json || "{}");
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
      triageProblem: async (context) => {
        const convo = [
          {
            role: "system",
            content:
              "i explain everything as sarcastically verbose as possible",
          },
          create(`I receieved this error
          ${context.errorMessage}
          with this stack
          ${context.stack}
          what could be the problem. list any possible solutions`),
        ];
        const res = await generateText(convo, 512, 0.7, (diagnosis) => {
          send({
            type: "triaging",
            diagnosis,
          });
        });
      },
      createPayload: async (context, event) => {
        const guid = generateGuid();
        const convo = [
          ...context.chatmem,
          create("create a short title for this conversation"),
        ];
        const res = await generateText(convo, 512, 0.7, (title) => {
          send({
            type: "set payload title",
            title,
          });
        });
        const msg = formatResponse(res);
        const answer = msg.choices[0].message;
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
        if (!context.loggedin) {
          return localStorage.setItem(
            COOKIE_NAME,
            JSON.stringify(context.conversations)
          );
        }
        await store.setItem(COOKIE_NAME, JSON.stringify(context.conversations));
      },

      speakError: async (context) => {
        announceText(context.diagnosis, context.lang);
      },
      speakText: async (context) => {
        announceText(context.voiceText, context.lang);
      },
    },
  });

  recognition.interimResults = true;

  recognition.onerror = (event) => {
    // alert("timeout");
    send("timeout");
  };

  recognition.onend = (event) => {
    // alert("done");
    send("done");
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    send("user talking", { text });
  };

  const setState = (name, value) => {
    send("set state value", { name, value });
  };

  const [setLang, setTokens, setTemp, setAttitude, setMode, setAutoOpen] =
    Object.keys(defaultProps).map((key) => (value) => {
      localStorage.setItem(key, value);
      setState(key, value);
    });

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

  const unhealthy = triage.state.can("diagnose");
  const diagnose = () =>
    triage.send({
      type: "diagnose",
      errorMessage: state.context.errorMessage,
      stack: state.context.stack,
    });

  return {
    ...state.context,
    state,
    send,
    triage: JSON.stringify(triage.state.value),
    unhealthy,
    diagnose,
    diagnosis: triage.state.context.diagnosis,

    // exposed helper methods
    setLang,
    setTokens,
    setTemp,
    setAttitude,
    setMode,
    setSpeak,
    setListOpen,
    setState,
    setAutoOpen,
  };
};
