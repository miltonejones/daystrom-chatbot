import { attitudes } from "../chat";
import { chatActions } from "./actions/chatActions";
import { createMachine } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBECGBPWAXATgewFsACAYwAtUsAjPLAYlgEsoA7IxlgbQAYBdRUAAc8TLIzwsBIAB6IAjACYA7AoB03OQFYALFu0AObgGYAnJoUAaEOkQBaI6qVH927UpP6l3fSe2a5AL4BVmiYuISkFNS0DMxseACuWDz8SCDCouKSabIItnLc3JqOCnJuJgpGhZoAbEZWNgheqtoKbRVGcp0KvgpBIRjY+MTklDRYqgCSLIxiqAA2RNiUYHQpUhmzWVK5+Qq1qvqGRprGXtrcNdoN8jUmh84eZqV+Pkb9IKFDEaPRExxbBaMABeYCIYBYUA4YFUMCwRASsDAOCI8zwJEoWToEAkMI4ADc8ABrGFfcIjKLjVQAubzEFgiFQlgwuEIpEotEYsQSBAE9GYiQpdZpTbc7KgXZyMpyVQKNw1JTuGqaFQmG4IHTFTwmIymOX6UwmJQfMnDSJjWjUma0+ngyHQ2FgeGcgVsCBO1CMeawbG4q2EkmqU0-SmWmmMIGgu1MllO1H8sVEd1YT3e3ksQlcrJCvgbERbCQ7OxKGrcVQ67x+DSqhXq5UypwluqnGp3Uwmwbk81-VSoQSCJYpnD0YVCfNiot5VxKRytbhylVGSondVdVqyowqU5dTSbjthM2-Kl9gfLYdrOSpMeZQs5Oy6bSqIzKkxdbhKTyVORKdUvLUfnoPBqfZfH3b4KQtCYAEESBIMBBDESEiEJRg4PYFhBCSOgMRYOD5lHdJx22O8EBqfRHE0XxzAUHxtGfXVVyle5uG0I0pV1cxnzArsj0tGC4IQjgoGQvBULBDhMPoMQCDARJklzEUiNvCVECXe4tC0QoDG-fZVyuBtWjohRvAVQwam4w9Q2g2D4MQ4SULQiSklUM94QcsEcDAEg8FYAsWF9ZkCNFYiVIQKU2nUE5PHcHd2NXYyZ0oxUWJMd9330Ppgk+TtLMg1R+NsoSRLE9DJJcoc3NEtDPO83yxQCsBOEvPMb3FGR5EUdTuBMYCnHnb8P1XFQZTMOpLlMLo2gskM8oKwSkPc0rnNc4rqq8nzrSxRFkSIFN5iJISgqUtrcmAx9Wn8IwLhqKVv30VcWIcJQ5COKUNEuYxNGmiCezmuzVvEjDnO2lEcLwhr-WJPEMyh2wFBqIkoFQI7WsnfQakOBdTiNTjOmuax5E0A11DKUsPw0Gi3G+7sqQABXwODYFgbsiEEYYEPy-sIQgIgAEcEjgRMsDwIgyEYbA8BwdA1gU68-MnZcHDlZcLkqI4XHVDwZU3I5CiKK7lBManeImen0TgZnflZ9mJgAZW563CAQ3aRYAcVpgAVCG+UDH2wFsZKFRR+WSKuujHGfMo6J1RtNAezcnw04zS1fXdMoGA8Zp7M3GctqJHYIDn7ZYHm2ad+FhaId2vZxZlId9mGSQDrwg+axTUdDnryP0In2l3Dw6PjmdOn8ZPuq0Jdjas1Qc4tlmy8Lu2HYX53K+ruhkXwHBVEEeZKAAM0lgh6-9wOlGDicSOUOR7hLfr9DKbq-Hi7r1CNFR0ffZVuqnvLZ6Z+eNtVDF1LjbF2VdPYMFwGAVAxBPKwGECwJEF8QrtQQDRHqqhTguDkHUD8Bg44EyaKWCOdwTCvgqCxH+WVgw-TpgzOeVsV4TGYeCHAW86A1TwPiZEKDlJoLaCqWUFxuqmAuCqXBjFOiqC6FdAob4ly6F-tnBhACmFANYZvSW2FUC4TAPhWWhEO6hVKPDLB-gihdyUKxBiRCXpmBkd1Us84-APm0MoqkAB3T0-1D4oicvQbaAM+EnUQP4GcigxGKk3DpGoeldCzjlEuEy5N9AeMtN4rYSE-FLXoEieEywsBgnxAsAWISFZqwjiWGiygrocXVFdI4MjcHvmotYxQxoaE5Szl4nxRUckBLoKgWARJykkRvoYForg6h1Ayq2K4q5XxllbD4F6CpFEVHSRMTJvjJa5M4RCWBjVDHBX4bkfYShij0TEUaFirYfxEIuTOaxqVPC6guiWLZqgdn9L2YMzyBBuHHKvEYkOJieja3RuQgodEritF-MBYoN07jaGVLqMiRsumZzoRkvp2S-lA3oMyTx3YxmhVsL4VQyo7gllaModGrhfybnOjoRQfhnpti+T8-F-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-iuBcEuWPJsnmnsl-LEzTJk3mAvJInsHKxvMUDvN3GtMaDZQxkaTIgSjegMC+X-lP2YXwtCi0GAipRimqB4wXDrCcA3DIWTiSj8AYtR3zmYU5kEAdn5kFiyHATFglilhYslRumWU4v0wyh4qIV8Axmgr4IDzlGKMlJUQ50AXLmAWXjATXk9iUvOWVDUErK8B7mdWek1lRXUDcD0vMCUQEL-lEvM3Es0TGxsqHW6iRXcAMCqCOFpwopvgxmVHdxUD928s-PXXbWzSSGCrCiuNojXAqyKCcH6NbDVTEUAinSsKMt6UzXSpYTULBALVAyKUyo0lxN0DqSrEXF-FcHIl3AVEcpUAfw-OnKAO+TSs7QmC+z3TNyaoD1nBYn2Dei1IePQXfhaF1AqC3L3B8oA1GtI3ExgQgEaHbPcJ42KGfLqFMAYyJLDKlHUA1SXTlFcCumI3iLE0vyCulxlKHQOGcGAh8H0hulwS5N1HDJ1wE0SsmhdKGpexPzO3D160ypoi0HLC3FCIwUHjsXIXIhMlLF3D8DBrH1ry53Pxs0IIG3SxFSjyy0ythRlAmTRV8IxRCzKE1wFKJi0FKA+IqstBhrRzhs+war5xFwowRvRgcHMID2cDRvqEeW8DvUV0VEMD1hXRSurz8qJr5p5xgRx0bwgEyvJ2KDcAMCuH0kuUHK+v2CpX6iStkU2S2uPzVrPw1sj2j3Nx1oRtSjUDtMXx1FMDOF-FqHVP2FqH8AqCiuVqhvax5rDwuwbyFsky3ndoME12ei8OenCr73XGsRVABpfyuCnK5vixMt5pjreoTo+uNNcAuFlFU38EMAevUzDJukcUph-2UCfS+RAJgXAPM0gKYH4VAvJRpXUG8FDQ8CwP8CZVOHLB0G6hQyOGfE5ue3azwNQAIKIJIJwGptRUfA-BhX032B8AeirsGNbAMFaCuncGO1qpEM0PEJIEXPLo7IKC418DmpOHyofhVMQB1E9rIhYlGK0B7nTgjuhI2IcKapvmHhODuH2A0B6Pil22XBUGMFaQiupMmLgyqNiPiIICaqHo0D1HcDfMsIaX8HLAIZoh1h40xRVu+LAdhPhLmMBKRIWDbNBU+rCgXDjV8NgadKBpohaAIf-zlyXANHQc2IhLpK9EgCapd3UGAmwJ7w0HhSIR0F3K0hiWeEFKFKAA */
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

            // states: {
            //   "showing error": {
            //     on: {
            //       diagnose: "triage",
            //     },

            //     description: `Showing the error and any diagnosis`,
            //   },

            //   triage: {
            //     invoke: {
            //       src: "triageProblem",
            //       onDone: "tattle",
            //     },

            //     on: {
            //       triaging: {
            //         target: "triage",
            //         internal: true,
            //         actions: "assignDiagnosis",
            //       },
            //     },
            //   },

            //   tattle: {
            //     invoke: {
            //       src: "speakError",
            //       onDone: "showing error",
            //     },
            //   },
            // },

            // initial: "showing error",
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

              onError: "login failed",
            },
          },

          "login failed": {
            on: {
              retry: "showing form",
            },
          },
        },

        initial: "showing form",

        on: {
          cancel: "initialize engine",
        },
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
