import { useMachine } from "@xstate/react";
import { modalMachine } from "../machines/modalMachine";

export const useModal = (onClick) => {
  const [state, send] = useMachine(modalMachine, {
    services: {
      okayClicked: async (context) => {
        onClick && onClick(context.data);
      },
    },
  });
  return {
    ...state.context,
    state,
    send,
  };
};
