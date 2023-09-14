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
import CryptoJS from "crypto-js";
import { COOKIE_NAME } from "../constants";
import getRecentConversations from "../util/getRecentConversations";

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
      getUserData: async (context) => {
        const { userData = {} } = context;
        if (Object.keys(userData).length) {
          return userData;
        }
        const place = await getLocation();
        return place;
      },

      interfaceLoaded: () => {
        attachClicks();
      },
      createUser: async (context) => {
        const {
          password,
          username,
          email,
          fullname,
          encryptedCredentials,
          credentials,
        } = context;
        const encryptedUsername = CryptoJS.AES.encrypt(
          username,
          process.env.REACT_APP_ENCRYPTION_KEY
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          process.env.REACT_APP_ENCRYPTION_KEY
        ).toString();
        if (credentials[encryptedUsername]) {
          return alert(`User ${username} already exists!`);
        }

        const lib = {
          ...encryptedCredentials,
          [encryptedUsername]: { encryptedPassword, email, fullname },
        };

        await store.setItem("credentialsets", JSON.stringify(lib));
      },
      dropLogin: async (context) => {
        const { loginKey, encryptedCredentials } = context;
        delete encryptedCredentials[loginKey];
        await store.setItem(
          "credentialsets",
          JSON.stringify(encryptedCredentials)
        );
        return encryptedCredentials;
      },
      loadUserList: async () => {
        const credentials = await store.getItem("credentialsets");
        console.log({ loadUserList: credentials });
        if (credentials) {
          try {
            return JSON.parse(credentials);
          } catch (ex) {
            throw new Error(`Could not load user list because ${ex.message}`);
          }
        }
        return {};
      },
      processLogin: async (context) => {
        const { password, username, credentials } = context;
        const encryptedUsername = CryptoJS.AES.encrypt(
          username,
          process.env.REACT_APP_ENCRYPTION_KEY
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          process.env.REACT_APP_ENCRYPTION_KEY
        ).toString();
        const ok =
          credentials[username] && credentials[username].password === password;
        if (!ok) {
          console.log(
            JSON.stringify(
              {
                credentials,
                username,
                password,
                encryptedUsername,
                encryptedPassword,
              },
              0,
              2
            )
          );
          throw new Error("log in failed");
        }

        // alert(JSON.stringify(credentials[username], 0, 2));
        return {
          encryptedUsername,
          encryptedPassword,
          ...credentials[username],
        };
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
        const { username, loggedin } = context;
        const localDb = localStorage.getItem(COOKIE_NAME);

        if (loggedin) {
          const remoteDb = await store.getItem(username);
          return JSON.parse(remoteDb || localDb || "{}");
        }

        return JSON.parse(localDb || "{}");
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

      persistPayload: async (context) => {
        const { conversations, username } = context;
        if (!context.loggedin) {
          return localStorage.setItem(
            COOKIE_NAME,
            JSON.stringify(context.conversations)
          );
        }
        const trimmed = getRecentConversations(conversations);
        console.log(JSON.stringify({ trimmed }, 0, 2));
        await store.setItem(username, JSON.stringify(trimmed));
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
    if (!state.can("set state value"))
      return alert(
        `Cannot set "${name}" state from ${JSON.stringify(state.value)}.`
      );
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
  const stateEnabled = state.can("set state value");
  const chatEnabled = state.can("ask");
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
    stateEnabled,
    chatEnabled,
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
