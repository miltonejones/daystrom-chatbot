import { attitudes } from "../chat";
import { chatActions } from "./actions/chatActions";
import { createMachine } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout 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-BhsDbq0Sm2Zpv4iH4MMCqCy+gNZ-WM-lXsZnwEr0sxIazLI7OkAkI5l0LnfQBw83gLzt8O7y3vhFN1Tg3A2rAnWMoIWvzXX05lBKOK9WJY0cluAVmYy2dmPZrLkqct7xk5Bk+WBAmXwDrYTz3nLnnSnBWEsqhqhtA-mUUwP5qj1jor+dsaTp5-OIyZhLlsOuUCICl9B0JgOlLZhgVE1Gj2nsDAw7xYx2vL3O5d6zN3QS5vQA9iAaYMzSr4IhsCBQ7UxJon3DULKzDSmVPjR4NTJFtdO59uE33oQkCo7d-7gOnvuam+gAg6BHhMZOCWACD6TDjUI28qmN1KZtjogaGiRHm2kY+xZrrqWcd47+-dvAj2il3YByL3mYgsCzFDZ3cNORDDNE0GZF+cdzD3DRep6U7RyiOGfEqdHzDMcXb51do+kqJZwgJ5LonTdT22HQNwLAKgqCIa-E4dwev5F6zeXsG6fcOg4s1IbuLjCLQ85ttji3OAmDYHF4TiDR8xsTdg07l3bu5tmOwe++sBs9Q9PuHoTbdyVwdDq3FMvRvzNR7N9Zm31GdF6J4QxxD84luG2VGItW+ofxgUq0BNWFiiG7Gr0lr7dfoRSab7JgxBEmP3BJvUlZC5J1vvfHnjWUylSmRVWPs7WPJ9qGn7Rlv-Cs8K8QJ4aKOk3AdDMjq8aaKFwHHLAuSRoXXB6pILL1AkMV6IjMyYg3r2DvhvTKgGxEJeCOCqgOLGBOAaiRbbgqgqic6vYtqoKIKEhEAGKwA+JIh25uYtznpyDoBYBmoX5lbYIVhvRqxGTKKOAGhExFA9RLqlCr4tij5h5vZHxdqgj5JgCnyny+T0BlrJilJ9hVpIg1q9QGyNpc4gK5r5pDKCHCEkAKTQpXIRKRTt4uBape6KD9TaxVBWJqx0rGQWTUzcEtqoiMhboED6KGLGKaHzZkSOD-he7yiB6wF1D6iVYahPIBZGw6R6q2EcD2F0Bko4HwQJAsAaFhpUE3KKqFDjQvAravAKjriGBPhKB7DuDbiKDeA8rWGkZhFsCp6wBkB4A+Igo4AOG2GYQKZZx+YGDQ6yilDPTcZ56IHjRGx6ixZrrxaUhlH2HuRVE1GGoOFi7lqoQVJy6lZYIWo6CaDthFDJwaiPBOpODqaIGs4er3A7IKEFQjGp7kC+QnQoS46QDgg0i5YNz5ZHG9gnEwZnEkAXEiRXFuhxHhipi8iZgChg6UGLFX4ASFBtga6-ieDljtg-gGhPgARtDRaeCJRUyhH+ThGnFkDnElSfE3E-HehJ5QbjYwaPHDHonlEvFYlvE4k+RfG3HA7xhZiAkuHZ4WooEHB+BqwNZtgwmJzuD-hgQWT4xRT04DFHZDEWjPF1FqAnEpiQAz44CnKmoKbKi8aOCKDVDjTzidBqgEIxQKjKqlDPpGaDHh5jBXF7qoAxHxBxFjHVERGwDxBUAEDTBMYPQHBfi0SPT6DGBqinAuAa4eAMT0qHHoGkYWm3ZWl+Q2ljCVH2kTYMCxgzHlKzCVJAnXJqSPCzgpKdBmSMEG5qi2Cgn2ovAc4eD3B4olEgIRmghRmxGxlOkulwhJgph3FEEkhhnVmC7RHRm2mOnOnTCJjuieiwAMn-FcDMkJHAk4IgTqCoYUwGjeDaCJIzq7A3RNhuBLkzSznf7dl1kxnuSNmDktkjnDYHzJ7QbSmkkWg1k9n1mHkDnNnDm-EIzjnZgsmX4tKGwFDqYzREK-waxvrGClgamnA8bX67mIKRnWm2kRmZDtpykQBKnSxMZ7AIFGyqBqwWSdA1hYZ4L6Aan6YmwKh6qBJQC0B3bMw+JSy8zUU4CEinyog+IPlNlDnJinmuZXwvZ7KkZkUUW5pUU0VEB0UMVMUsXHnPmjl-Gg68AqmWLlDmArIti4rNK2DzqaB3DqaLgLq5GWRVkFR8XW6jJ4FCUiWMXVHiVPnsVehnlSwXnElXmdkGVSzkVGWCU4C0VSyiUWX9msUnkvkg6ijvlTkZk4KQHagATmDmDoZLKJxIx0RPj6AMrLk8bpr6W9iGWUUmUeXCVeXmXMUoKxinyIUKnIUUEfmJFDorizg-TPjwozTaCqWai1IrorhMrHBoE8UgJSkOGZUCXZUQAKaZyaAbERbqYrYrl1D2BuAzLeB2pUzaS5TpWUh9XGV0WeX0X5V2nkoJm+WunpnaFTJjQtB3C7DyK4VTUoqaCFEATHCVgtiHbXljCrXuUbXeXMWIhxGZYsCnyMB1Euh0BEgYAqkmA3S+DjX6heBtiFkGRJq-TGCvCKZtCkUuX8VrWmV5ViVxk7UXyJnFLiFlJzFt6agclgSVg7bdKFl3DqDDqqB9wzQZSBDcQsB4BujwCpBPUhXaH2D6j1ihaGGI2hadFTWDzSivDl6MparCamk8GTAAjzDlpc1TjTXK5yiKUj74Yjx2AGDPwMTCLNbPh6phgRj0h2hMhK1kQ7A6Q9SEKnWjRQFqo03CLIlfilBEJG27Qm1Rj2gsgQxxjjkW1UoxJvTXCeHrY4XTp1AVBajKi7CFGbLwGPVOW9jG20iRgMg+2xjOgJj+Xs0LGhWgHa505BbPjnDKi1ggTM79wmB4Y0TFEy0tqnhDh-5YCB3YJqXW0vyvBQ3l6nDNKuAFAJRMplAdWLh6pAwlSrTBJt3bCgkawmClCmS2qKrawsGvzVDlgdBDxJ1dWAyCTLROQ1SgwVQbSrQ8INRYJaFTgTTShaS9F6CnANBMQvAHAooAIGTlj3Dj373AxT0kpAZsikBz5GIz3a2VYAQ6RpLL3XDrgND7CtIo4b69T6h6rqIm6QKgORTLouDxQGyJT8aai1jlBbis65GnUGw72iZqIY6sKlxcyCBOwCxCzwXVziySzSyYM6qrK4OGYEPNI1aFBUycG5HKKoM0OaJ0OOwbyrzbxwJeyYOvD4z3KZR9zurVDaxtCCNF67D4zuBiPG60NrzsKlwKkKNFAYryj6hlh9yR1XB4KKh66qkOB6PLUEqDLbqt3y6VVJxvR0T5FJW05a1hVNgaoaw8ko7Kh-ruOAZKHdoFq7qlKcOJQcn+NVad5BMND6jhZyhfKZNcEN2kaboSZAYJNiorxgZJMx095x1jxU5cZ1AqiJrRYvCLqGz7iuN8rkZ+qUaIIQB1D52HVmBaivwPLtjQlBMVCdCFBarLqZNJVRO1GAYn4jYKP+5hO4IGQ6pELNIGDvj4LthCZONtX74m7Y4KN3oaU6May4L6DLJaDTNrJFCUzNAnO86oL842Y4F9bfXZbOaYP6AdA9TAQYVtiPA+FDqSg674wVkOC-iUPHaUiR6dbvPm6-YJ6S7nOuCXO5HXN+MZOmT3qq7U0BZ6CvO14ovWa3kN4QCYNU5ajzpMqbMHFvJrkvw6oajsQvBkvIvdYx5x5GUS7UYKPqYFBKKL7tiGDJxvKAvCJ7CJQvCNWdVUMnYGPku8vUumNePTmoE01VCh1DQeq2M4IQ5zi-I4UbL6DcsT4UtT69OasDMLaeAlhAS8PaXuDr6Au9SUzv5lDPrf6-7-7naAFMCCJX2W10qFBfLvyRVx0sotgjXvxIappNh6qYGoDYG4H4E4D-OIlNA6RnBpyqDgtJxqzKbPgf3zhuDyhtZ8EAaqEiGcMAKaDVNHBKg6TC2IB7ZglRZmCdCqD4xol2ETacO+ApzKDgkti+CGwvQFCSJ7g-SkxeGDsYkwbY21EECcMRu7hpEtOmTvhvpdAHCSL4Z9ynDGD13ilmkynkmjGvHvGkC0l4lzB50wreOlAk1PovCTs7F97XT3RQ0zigQvMdPXtDswaymejykQacMe5gkDwCZqweAbaJx6nHAGkDQmyVkFNdlQW1kwWeMOvhwGzXS-lIZ0rlAdu5BdDXS5E8nLqemPqQWWn4fbX2G0tGwliDRJW+DLpayJz+kgTxIAuNjzhMfQW9kNmPlsWtm0ucYpHNV9sARaA-hKaKbqaPCKgVDHDwsSnml7ksdwUSAIWQc0tauhWtEFC3WahGmvi0RAUjpfh6wcRqY6dXsvUDW5WbVMWbug0KWGC9TKWPCqV5lNCKPAR4YG4o04CuVZXrWefvWsfDtmfaHRW9yZTlBaWARBO2BXWvhcmb1I6ksgfudxdmVY1HlWUyfJdThTI1XeCmQ8ZdDPhGsd0FBRXV0YWntilPVqAlcY1ec+U3HfW-X-VUFhsRRNdvRyjVBgU6TlCTV2AqjU5JVjUIm-rFeo1uUedlcWWFVwjFUmf2uvvauTT4JDTZTjQabZdLdHtVY-Tt4cfdfJ2UihuuFB3RbSiPR1Xl65lqjuDa7iKviFEaxAJM1AA */
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
      chatHistory: [],
      errorMessage: "There is no error at the moment.",
    },

    initial: "Initial state",

    states: {
      "Initial state": {
        always: {
          target: "initialize engine",
        },

        description: `Leaving this here for any future preload ideas.`,
      },

      "initialize engine": {
        states: {
          "get user location": {
            invoke: {
              src: "getUserData",
              onDone: {
                target: "get location details",
                actions: "assignUserData",
              },
            },
          },

          "get location details": {
            invoke: {
              src: "getGoogleLocation",
              onDone: {
                target: "#Daystrom chatbot.app start",
                actions: "assignLocationDetail",
              },
            },
          },
        },

        initial: "get user location",
      },

      "app start": {
        description: "Route to voice or idle state based on settings",
        always: [
          {
            target: "Accepting voice input",
            cond: "auto listen",
          },
          {
            target: "waiting for input",
          },
        ],
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
              done: [
                {
                  target: "#Daystrom chatbot.pause for effect",
                  cond: "text was detected",
                  actions: {
                    type: "assignPrompt",
                    params: {},
                  },
                },
                {
                  target: "#Daystrom chatbot.waiting for input",
                  description: "No question was heard",
                },
              ],
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

            description: `Add the question to the conversation so it appears in the UI`,
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
              onError: [
                {
                  target: "prompt error",
                  actions: {
                    type: "assignProblem",
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

            description: `POST the question and chat history to chatGPT`,
          },
          "prompt error": {
            description: "Fault occurred sending prompt to LLM",

            on: {
              recover: {
                target: "Send prompt to GPT",
              },
              cancel: {
                target: "#Daystrom chatbot.waiting for input",
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
              500: "update chat list",
            },

            description: `Give dynamoDb a sec to update if a change has been made.`,
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

              onError: {
                target: "read error",
                actions: "assignProblem",
              },
            },

            description: `Get latest list of conversations from dynamoDb`,
          },

          ready: {
            description: "Apply any _onload_ scripts in the UI",
            invoke: {
              src: "interfaceLoaded",
              id: "invoke-7mzgn",
            },
          },

          "read error": {
            description: `Error getting dynamo data`,
            on: {
              recover: {
                target: "update chat list",
              },
              cancel: {
                target: "ready",
              },
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
          retry: {
            target: "Process chat prompt",
            actions: {
              type: "resetPayload",
              params: {},
            },
            description: "Ask the previous question again",
          },
          rephrase: {
            target: "Process chat prompt",
            actions: {
              type: "reformPayload",
              params: {},
            },
            description: "Edit a previous question",
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

              onError: {
                target: "read error",
                actions: "assignProblem",
              },
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

            description: `Modify the existing chat payload using its GUID`,
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
            on: {
              "set payload title": {
                actions: {
                  type: "assignTitle",
                  params: {},
                },
                internal: true,
              },
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
              onError: [
                {
                  target: "payload error",
                  actions: {
                    type: "assignProblem",
                    params: {},
                  },
                },
              ],
            },

            description: `Save conversation list to dynamo storage`,
          },

          "payload error": {
            description: "A fault occurred saving the payload to dynamoDb",
            on: {
              recover: {
                target: "#Daystrom chatbot.waiting for input",
              },
            },
          },

          "read error": {
            description: `Error getting dynamo data`,

            on: {
              cancel: "#Daystrom chatbot.waiting for input",
              recover: "get all conversations",
            },
          },
        },
      },

      "clear chat session": {
        entry: {
          type: "clearSession",
          params: {},
        },
        always: "initialize engine",
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
          1000: {
            target: "#Daystrom chatbot.Process chat prompt",
            actions: [],
            meta: {},
          },
        },
      },

      "login form": {
        states: {
          "showing form": {
            on: {
              "log in": "checking credentials",

              "set state value": {
                target: "showing form",
                internal: true,
                actions: "setProp",
              },
            },
          },

          "checking credentials": {
            invoke: {
              src: "processLogin",

              onDone: {
                target: "#Daystrom chatbot.initialize engine",
                actions: ["assignLogin", "clearSession"],
              },

              onError: "login failed error",
            },
          },

          "login failed error": {
            on: {
              retry: "showing form",
            },
          },
        },

        initial: "showing form",

        on: {
          cancel: "initialize engine",
          "new account": "create account",
          "forgot password": "forgot password workflow",
        },
      },

      "create account": {
        initial: "show form",

        states: {
          "show form": {
            on: {
              submit: "submit details",

              "set state value": {
                target: "show form",
                internal: true,
                actions: "setProp",
              },
            },
          },

          "submit details": {
            invoke: {
              src: "createUser",
              onDone: {
                target: "#Daystrom chatbot.login form",
                actions: "assignNewUser",
              },
              onError: "creation failed",
            },
          },

          "creation failed": {
            //...show error message
            on: {
              retry: "show form",
            },
          },
        },
      },

      "forgot password workflow": {
        initial: "show form",

        states: {
          "show form": {
            on: {
              submit: "submit details",

              "set state value": {
                target: "show form",
                internal: true,
                actions: "setProp",
              },
            },
          },

          "submit details": {
            invoke: {
              src: "resetPassword",
              onDone: "sent confirmation",
              onError: "reset failed error",
            },
          },

          "sent confirmation": {
            on: {
              okay: "#Daystrom chatbot.login form",
            },
          },

          "reset failed error": {
            // ...show error message
            on: {
              retry: "show form",
            },
          },
        },
      },

      on: {
        "forgot password": ".forgot password",
        submit: "forgot password.submit details",
      },

      on: {
        "new account": ".create account",
      },
    },

    predictableActionArguments: true,
    preserveActionOrder: true,

    on: {
      "sign in": {
        target: ".login form",
        description: `log in or out of the interface`,
      },

      "sign out": {
        target: ".initialize engine",
        actions: ["clearLogin", "clearSession"],
      },
    },
  },
  {
    actions: chatActions,
    guards: {
      "payload has title": (context) => !!context.payload.title,
      "use silent response": (context) => !context.speak,
      "auto listen": (context) => context.autoOpen === "true",
      "text was detected": (context) => !!context.transcript?.length,
    },
    delays: {},
  }
);
