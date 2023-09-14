import { assign } from "xstate";
import { attitudes, create, createSystemNode } from "../../chat";
import { decryptCredentials } from "../../util/decryptCredentials";
import getRecentConversations from "../../util/getRecentConversations";

export const defaultProps = {
  lang: "en-US",
  tokens: 512,
  temp: 0.4,
  attitude: attitudes[0],
  mode: "voice",
  autoOpen: "true",
  speak: true,
};

export const chatActions = {
  assignUserData: assign((_, event) => {
    const props = Object.keys(defaultProps).reduce((out, key) => {
      const value = localStorage.getItem(key);
      if (value) out[key] = value;
      return out;
    }, {});

    return {
      userData: event.data,
      ...props,
      chatHistory: JSON.parse(localStorage.getItem("chatHistory") || "[]"),
    };
  }),
  assignTitle: assign((context, event) => {
    return {
      payload: {
        ...context.payload,
        title: event.title,
      },
    };
  }),
  assignDiagnosis: assign((context, event) => {
    return {
      diagnosis: event.diagnosis,
    };
  }),
  clearLogin: assign(() => {
    return {
      loggedin: false,
      username: null,
      fullname: null,
      newuser: false,
    };
  }),
  assignLogin: assign((_, event) => {
    return {
      loggedin: true,
      ...event.data,
    };
  }),
  assignNewUser: assign({
    newuser: true,
  }),
  assignProblem: assign((_, event) => {
    return {
      errorMessage: event.data.message,
      stack: event.data.stack,
      diagnosis: "",
    };
  }),
  resetPayload: assign((context, event) => {
    const chatmem = context.chatmem.slice(0, event.index);
    const rest = context.chatmem.slice(event.index + 1);
    const question = chatmem.pop();
    return {
      chatmem,
      prompt: question.content,
      rest,
    };
  }),

  reformPayload: assign((context, event) => {
    const chatmem = context.chatmem.slice(0, event.index);
    const rest = context.chatmem.slice(event.index + 2);
    return {
      chatmem,
      prompt: event.prompt,
      rest,
    };
  }),

  assignAsstTitle: assign(() => ({
    transcript: "",
    question:
      sarcasticQuestions[Math.floor(Math.random() * sarcasticQuestions.length)],
  })),

  assignTranscript: assign((_, event) => ({
    transcript: event.text,
  })),

  assignPrompt: assign((context) => ({
    prompt: context.transcript,
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
    contentText: "",
  })),
  assignConversations: assign((_, event) => {
    const trimmed = getRecentConversations(event.data);
    console.log({ trimmed });
    // console.log(
    //   JSON.stringify(
    //     {
    //       conversations: event.data,
    //     },
    //     0,
    //     2
    //   )
    // );
    return {
      conversations: trimmed,
    };
  }),
  assignBlankConversations: assign((_, event) => ({
    conversations: {},
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

  assignUserList: assign((_, event) => {
    const encryptedCredentials = event.data;
    const credentials = decryptCredentials(event.data);
    // console.log({ encryptedCredentials, credentials });
    // console.log(JSON.stringify({ credentials, encryptedCredentials }, 0, 2));
    return {
      credentials,
      encryptedCredentials,
    };
  }),

  assignResponse: assign((context, event) => {
    const res = event.data;
    const answer = res.choices[0].message;
    const loggedAnswer = { ...answer, timestamp: new Date().getTime() };
    const rest = context.rest || [];

    return {
      streamText: null,
      chatmem: [...context.chatmem, loggedAnswer, ...rest],
      voiceText: answer.content,
      rest: [],
    };
  }),

  assignLocationDetail: assign((_, event) => {
    // alert(JSON.stringify(event.data));
    return {
      userDetail: event.data,
    };
  }),

  appendPrompt: assign((context, event) => {
    const chat = create(context.prompt);
    const query = [createSystemNode(context), ...context.chatmem, chat];
    const chatHistory = [...context.chatHistory, context.prompt];
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    return {
      prompt: "",
      query,
      chat,
      chatHistory,
      chatmem: [...context.chatmem, chat],
    };
  }),
};
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
