import { attitudes } from "../chat";
import { chatActions } from "./actions/chatActions";
import { createMachine } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBECGBPWAXATgewFsACAYwAtUsAjPLAOgEkA7ASyxdQBsjtKwBiANoAGALqJQABzyw2LPEwkgAHogC0ARg0AmABx0ALLoPaArBoDswgGy7jBgDQh0iSwGY6u82+sXrwg2sATgMAX1CnNExcQlIKalo6FlZ2LhYALzAiMCYoZIEIBTAkpgA3PABrYuTyqrUsAzBlACsRcSQQaVl2BSVVBDULN206C203NxNtM38giycXBF8DTz8-M3WNIOtwyIxsfGJyShp6ZLk0zOzc-LoYLCIAV1gwHCJOPBJKeSZ+QqZqmVKsUogdYscEmcUhxOBksjk8gC7mAHs9Xu9Pt8FAgapiekw2m0lF05L0Ov1NBo3Bo6EFxpMhm4LBYqQtEKZqZ4fMINKYgqYrMzdiBQTEjvFTiULrCrgjbvcMV98UQICjUCxOLA-kUSrUQfsxXETolzqkZfCbkiFR8lT8VWqNbAcUDbQpCWJiTJSYpyeotGM6MJdHMZtotgYNI5nIhdH5adoDOZI1tTAFhaLDkbIXRUJJJDwsKgcFghB6OiT8X11IERm4gvytCY7CEE2yEEFhBY6NZrBprAZhondDyNOmDZmIZLc-neMWhBp2lIvZXfQNTMZu0O7L3qZ35tGEJMtKNtHvTHzeRZTGPohOJYkAIIkEhgSTsXJEcosF9EZKSR4ll8TAvpwRLlsuPxVks+hXiEpjTMGA7WBMbZaFsgYGHMWgTPBPg3mC4rGvQT4vm+yRQJ+eDflkf4Afw7AEGAeAAWBS7dJBq7DEEdC8rywgBLolhmKh-Y0hYJgDqeui+MOOwRCK47gvexHPq+74UV+P60fQs4PJpWQ4GAJB4FA0IKNqAKsZ0EFkqA-RaNMgZuOuzJBFSSZuKhp5dnyzIBB2gq6No+GGpOj6qWRH76b+TD-jphbFpR1FEIZxmmd6FlgIIC6euxtkqK4OjcRowjbNoQzCGGzK6KhYw0vyyE2HWVLTCFd5EXQJFqeRSVabFAF0LpvUGUZJlmb8aJvIWnAVORVkVhxdmINYCaGGYVIGDYaEWDVB4lQOowaHYWg8jYwjOW1SkdV1kUaVRfVxXQk2kKgwFgJwmW6sCX11No1gVFAqDzTZPpLQg0meAm56lVe9KRqh64eDygSdsOOjGBYl2EdmAAK+AvrAsBZkQkiHG+nV5jkEBEAAjo8cDKlgeBEGQLDYHgODoKWi7WXloMFQg0z1jx-hbJGtgcleqFnRhWwWEEdYw8MWNZpKeOfHARMQiTZP0AAylTOuEG+RBM0QADiOMACqfbiVQ-WAgxWL4wN81BkwHUMvYGAOCtDFLe3nV21LmKesy8sr8kZlduP45rxOk8b+uG4nBAm2bls2-8gJ6g7Ts2BY2U8wt+X9HWtieOuQsckExieYHTJ0CHOhnW5HLBVHinY2rceEwnut0AbTDU6n6fM5n-CvPgOB0JInCUAAZhzBB535Ltlmx3pQX9kx0KYO6CZtkYoXtf3CIYzKJt4bilUdKthfQ6sE1r8RG2nyfD2-Y8W9b-AHGAqBiCGVgNIJgLxXZb1XHoFaa0VpDCCtSSY1g2y6DrIYfilgvDaH5NJDuexbwxx7hrPu2tR70DIdkHA09+CpTwKUV4ECVxg2mOMHiAoGxuCwWGLypVRjbHXCEGSwQ5L4IIqrRIT946kIHhQqeHN+BARAowxaAswxUjWptcw+87DDFMKhLwHhUyniZPWIw7h77KToAAd3VOpIgS83jaX4GiYayjS7sksDxcYIRmRMiEsgvaolRgSWGEGGSQYLEdRsXID8DiYpxT-iiAsfBPxcHpm4-m-RpicNGEyFaQUhgDmcm2SYdgeJ9k7PBcqEZyqROzNEuxcSnGoFgBUDJUE5bnyOlMPstcDDyyCCJFk8ZNo+HgZg3QdTJQNJ6k0-qJZDJMEAVlDevNIHMIFKYJuyE6yYSsIEXwbYNhdnEh2WMEwTAChEQpAh3dEgzNiRzeJdFDIEDoSs4uINt7YJpJw4IbkAg+B9toI5K0tm9mCIEDkPhgxTPubY2ZTynEAisVmdpq5bArAmOGMw-F5YrX0agpuZzeIwrGG4OF9AHkUTmQk44uQsjGTKK8WAWICSrJLpk1w-gm7nWpIfI6TJxJHK2PoY+sZrD7z7O5Sl1iEWPMcfMmhKJOborBryP6gY259kKWMXaixeQ9kDMGbYpVOwRjwp3W54iqXyppUipVhlJBkBwC0j5uV1kC3cOfJkWjqSSv4iCvaQwRjjACFsXwUMqSyupfYh1j1JCoBcXEx4kgIB8H4MoXgWBiioAXjmnAAAKVMwgACU-Bo53NtTE+1iqE1JpeHGt4qb005rVaozVRgtpHWTLYYwoKIb9MCDoFk+8zBhCtWIh+cqa1NuefQFtKTtawmwLbIE9s7aOxps0Ngyh239EEls1Mpgin70lWMPRB4b7YPKVoAUfYd6jknaFSxsbaUDUXTm4mK6SxyJnnPRey887bt3fuxA0wxL+TOj7GGUZFgh3BW5fsQYIxQonaIl9US7Vzu0nQQyqBqZ-uVcZehOAwOHg3D2bRCteS1wLiUyw1haRHWmKMvwdgY3YfffQfDhGqHyMUe9cjWxWHDHsOe+s50NAlJvl2PQ0la7OWHOYWVidn7E2AaAl4yIHhcG4Ey0jrL8Ramzg7POTMwACnI0C8+x7+KVWcr0y9iw1FMZrtg4cRSvCqd7i-SgKU4BaeKAqPTpAFCGbZSZnUm7zN4Es4XHK4E3acX+U3RMdJBGhwDi56kKxUECisO5aFPniF+YeJphQ2mQucH0+FllkXJ78f-fPLADiV6bvqHFqzHKvmrkTPxPesZxZwXKkGlzLIaTBjDArKSt9rmVptbPXzGnAuVeKJ+rIib0AfAI2u3OC3p1qaka-CrYD1tppSVtnbEBnTlFdOy0Q5HsEmD3h2HQww9Dnjg+BzhoaL1-QQcYYQ15n3tWzEdkhJ3VtnboCQfDX6rt4F26ZmLHX0AEHQLYazTJz6xmPTtBqJ6jknq7E2QItdFOsZK+p7Wp3tNw4AQjjA13EkPERwR02bBODuqS56sucwVi1x7A5kNvrQUdjoH9NYzkFbnup8d-zdPiiSBZWzNnzOkcQD299NHwgsC6CoE96k3EIxDGhQOHaxP96GC8L2c355Mag8IYkCHZWAsgLW7PVX2ASYa923+2eLW2t53QHrg31mHNeMPqey8RygorDOqg8YyFxKVXl5DxX0PtPs749Q2hpGnsmFs8DsYm0AgCSOSEbiXEQiVR0A+kHGGweSldytj3MPeOUOoYJ0CPXktg19UjPQPzKo8lsCUzsNJzqCVrgKIMQr09u6V3hgBuf5H54YX3vniBgUjEEkgo6EKUygtPJ4Ywp5NGuYpU7qtsPudFmJi8QmPxuYeqYQLHsNIS07KZEORMCNkJRg+RToTU-BfBZUSB783htYn9ZBzIi438VED1mQuRxhBJ-BJZBk9p94PArxbcT09kJtZUQEAEKgiBXpYArFXhtcN111HZmgNB0AsB0ByMfYclYwgo9BSkcEEZPEfBfB71UxexOxVMG0sg4kwAF4F4jISws1Cwc0cx81XhC0Sp+Jy0DtLFE1k0nlJDpCSAsBhMi9uwJVTcqQ4E2xtgfIT0bAQwBxhxHd5ImA8BVR4AOgNCiJED3EBh0Z9AIVa4gpJU6RYw2w1B+QuRfsHcJgExJVZVmBpRkkc1PCuVvCExz4-C7A-o+Q9B9xFg1B9AJg-kaxtFew74b9FtTQYQ4RrhEQwAkioJNAwwE85h4IewjAsi48VgLcOQKkT1pJ+lZUKjLgLQaidMngXg3gbQ2U6jVxKQjUYYWj+wvA6Q2wIx9A-YT071IxxgBwBjoQhjqj5QklJjlRVRCxHRpiwZKQgxPBEwqozdTxnNlprdNoxh-AhgkM5hZVpxkliwLiBZQjPEOxfA+xgwrxLAsDFhcEbcL1OwTEdBG8bkp1LEbo7FoptI-iKRYwm4OCW4EFuj9VEAOxuIww7BYwdppI7dZUUSeo0T5lBoEo9J7oRo0pxoMT2RADcVSpoZ+lKpvsEAtA6RPB+wXjWiMYET3DsxqSoomT50npxiXo3pOA2SBg0FOEdpcTxh8SvJAg0tpIgpJ99pJkyjp1JEM82ddZlTeQIYjoBdkJIw5htg2wwTaRA1LB1xwwhRjTLFTS3cyEKYVdP46YGY7QzZWZ2ZOZLTkIVgbTxI7S9lHTA5VoWQbBBJmx+QT1ZUfT+4k5B4U5dZTZx5rZlS-ojpJcvAz1p8gppYkySpbAjoTUvtMzltpEczZEmtizKomMDFU9BwkMvIiUEwWR-AEEAd0NETMN6kuN40AJLTzpPAQgNpJh8d64XMbAmNxUypdEdlONZ1uNZ4xC50NtLTzB5yLUBx+sBQVzwMfZ9AORfArBYwExLkdzGlpyF0Lsv1l01djytlU9LkToJhBRK8UCik6QR1gcmQXzEU60BpeNFhN5397IgotkSSdkFZjAFYJ9jwgw-Ax0nzzyoKFVZTO8-1izrc-k9BtgIwSjJUZNOxXsYVHydw9BF828gtizD1aQL0OQgpEIrz+T6x9AwkhysEfABRWLacs9gsklQsDN6tjNlSkIaRRVJVnJhFgwRVIxJdJVyp3T4I+wJKod29tMNtfdttNcOLACQxzxfs+Kjkgwj0KTqp7M0wvSOpW9JLjLigGdLs-cIBlScctkh0+jRJYZiczBuw687cLU6w8Fxzm8XdmyjKgsvccBZAfcc9iyOwRhzpdK6wJgOwmRidexJczB95zAgivAxyJSW8krM8vL9zzKOdSLedELwMQh9ApdulLAWR5Y+TnsRhxIrktBew+jr8m9ndyE6ryspKV9mr2zWqkCd8YNJdJNzBhwnzpMr0toeJKpz8AhyoqMICoDH9NYVFOUoJVKbirwxhAUfZljg0eRRghtergdkI4qarEgSDUAyCKCqCcBFKUZjCjxhxOFzpHj+Ty8m5xhMi-o3IfZHcJrb8tDG0JCpCZDZy4xa8TBnIS9UyLDhhAxbABI1F1x4JwhwggA */
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
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
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
