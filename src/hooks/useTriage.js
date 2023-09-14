import { useMachine } from "@xstate/react";
import { triageMachine } from "../machines/triageMachine";
import { generateText } from "../util/generateText";
import { create } from "../chat";
import { announceText } from "../util/announceText";

export const useTriage = () => {
  const [state, send] = useMachine(triageMachine, {
    services: {
      speakError: async (context) => {
        announceText(context.diagnosis, context.lang);
      },
      triageProblem: async (context) => {
        const convo = [
          {
            role: "system",
            content: "i explain everything as gothically dramatic as possible",
          },
          create(`I receieved this error
        ${context.errorMessage}
        with this stack
        ${context.stack}
        what could be the problem. list any possible solutions`),
        ];
        return await generateText(convo, 512, 0.7, (diagnosis) => {
          send({
            type: "triaging",
            diagnosis,
          });
        });
      },
    },
  });
  return {
    ...state.context,
    state,
    send,
  };
};
