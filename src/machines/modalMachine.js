import { assign, createMachine } from "xstate";

export const modalMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsD2ECGAbABAY1WQAdUA7MUgF1gDoBLCLMAYlSIoG0AGAXUVBKw6lOmX4gAHogC0ARi5caAZlkAmAKxcAbOoAsATm1clSgDQgAnjKXqaADm2rZ+-at27ZsgOzqAvr-M0TFwCYjIKahog7HxCEnIqHDYKZjwACwxSGBwAN2wAVzBuPiQQQWFRUnEpBFUvLxotOy8DJV1NfSV9LS1zKwRdBo0FN27Or31Zf0D0GND4iNpokLjwxOTSVgBrDAti8XKRMVKa5y0aVWNdLQ07O1ktLnU+mXVumgfvXVUlHqcW6YgZaxMIJSLA+ZrShJdibPBYVCwIq8A6IirHUA1aSqOz6GhcOo-PRcTp6Z6WGTyVTKWQmJpabyqJlOQEQ1Zg2ioHYWfBYOh4LaQZgQcL0Ug5LlgKKzFagxY0Lm7Xn8wUQBB0cWoPAYI6kYr7UqHSrVV4tfE49qGJQTTxeF4IaQ3al3dTqB4-LzNNqsmUghZUTnc5UCoVgABOYdQYZoRCwOoAZlHkNLgn6oYGlfCVZB1Zrtbr9SjDWjdSaHZclBduqpulwvO6tLp7dJBnj3BXGwZdEYlD7U5COTRw5Gw7y0VlUgikQaBCXjScZLolIp1E4bN32nZV3YzBSHc47B99HZ3B4bI3aap-AEQKR0HBxGy5QHUUJSwuHU7zSe3sYbd5m3rRQlC3dQTDaJltH0Ps5nZeUGCYV90SqD9pD0VRANseo2jUMDHBJGDZX9cFfQHCIYQoJD30xRAmkaZpWnaEkuh6ZtGxoFwXB8Yx8Ogm8n2IjMeSzEMICo+caP3FRlC4a47m7dR6yZNiuEPVxrS8cDuhUQi00HYcozHIQsnEjFJEXAl8XaJdZE0WR3HU5sbEUHxBi8H52i0ZcT2vXwgA */
    id: "modal components",
    initial: "idle",
    context: {
      modaldata: "",
    },

    states: {
      idle: {
        description: `Modal component is closed`,

        on: {
          open: {
            target: "modal component open",
            actions: "assignOpen",
          },
        },
      },

      "modal component open": {
        on: {
          "change value": {
            target: "modal component open",
            internal: true,
            actions: "assignProp",
          },

          okay: "okay clicked",
          close: {
            target: "idle",
            actions: "assignClose",
          },
        },

        description: `Modal window is open and values can change.`,
      },

      "okay clicked": {
        invoke: {
          src: "okayClicked",

          onDone: {
            target: "idle",
            actions: "assignClose",
          },

          onError: {
            target: "error closing",
            actions: "assignProblem",
          },
        },
      },

      "error closing": {
        description: `Some exception occured closing the modal.`,

        on: {
          close: "idle",
        },
      },
    },
  },
  {
    actions: {
      assignProp: assign((_, event) => {
        return {
          data: {
            ...context.data,
            [event.name]: event.value,
          },
        };
      }),
      assignProblem: assign((_, event) => {
        return {
          errorMessage: event.data.message,
          stack: event.data.stack,
          diagnosis: "",
        };
      }),
      assignClose: assign({ open: false }),
      assignOpen: assign((_, event) => ({
        value: event.value,
        open: true,
      })),
    },
  }
);
