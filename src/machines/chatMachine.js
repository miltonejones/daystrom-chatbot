import { attitudes } from "../chat";
import { chatActions } from "./actions/chatActions";
import { createMachine } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBECGBPWAXATgewFsACAYwAtUsAjPLAYlgEsoA7IxlgbQAYBdRUAAc8TLIzwsBIAB6IAjACYA7AoB03OQFYALFu0AObgGYAnJoUAaEOkQBaI6qVH927UpP6l3fSe2a5AL4BVmiYuISkFNS0DMxseACuWDz8SCDCouKSabIItnLc3JqOCnJuJgpGhZoAbEZWNgheqtoKbRVGcp0KvgpBIRjY+MTklDRYqgCSLIxiqAA2RNiUYHQpUhmzWVK5+Qq1qvqGRprGXtrcNdoN8jUmh84eZqV+Pkb9IKFDEaPRExxbBaMABeYCIYBYUA4YFUMCwRASsDAOCI8zwJEoWToEAkMI4ADc8ABrGFfcIjKLjVQAubzEFgiFQlgwuEIpEotEYsQSBAE9GYiQpdZpTbc7KgXZyMpyVQKNw1JTuGqaFQmG4IHTFTwmIymOX6UwmJQfMnDSJjWjUma0+ngyHQ2FgeGcgVsCBO1CMeawbG4q2EkmqU0-SmWmmMIGgu1MllO1H8sVEd1YT3e3ksQlcrJCvgbERbCQ7OxKGrcVQ67x+DSqhXq5UypwluqnGp3Uwmwbk81-VSoQSCJYpnD0YVCfNiot5VxKRytbhylVGSondVdVqyowqU5dTSbjthM2-Kl9gfLYdrOSpMeZQs5Oy6bSqIzKkxdbhKTyVORKdUvLUfnoPBqfZfH3b4KQtCYAEESBIMBBDESEiEJRg4PYFhBCSOgMRYOD5lHdJx22O8EBqfRHE0XxzAUHxtGfXVVyle5uG0I0pV1cxnzArsj0tGC4IQjgoGQvBULBDhMPoMQCDARJklzEUiNvCVECXe4tC0QoDG-fZVyuBtWjohRvAVQwam4w9Q2g2D4MQ4SULQiSklUM94QcsEcDAEg8FYAsWF9ZkCNFYiVIQKU2nUE5PHcHd2NXYyZ0oxUWJMd9330Ppgk+TtLMg1R+NsoSRLE9DJJcoc3NEtDPO83yxQCsBOEvPMb3FGR5EUdTuBMYCnHnb8P1XFQZTMOpLlMLo2gskM8oKwSkPc0rnNc4rqq8nzrSxRFkSIFN5iJISgqUtrcmAx9Wn8IwLhqKVv30VcWIcJQ5COKUNEuYxNGmiCezmuzVvEjDnO2lEcLwhr-WJPEMyh2wFBqIkoFQI7WsnfQakOBdTiNTjOmuax5E0A11DKUsPw0Gi3G+7sqQABXwODYFgbsiEEYYEPy-sIQgIgAEcEjgRMsDwIgyEYbA8BwdA1gU68-MnZcHDlZcLkqI4XHVDwZU3I5CiKK7lBManeImen0TgZnflZ9mJgAZW563CAQ3aRYAcVpgAVCG+UDH2wFsZKFRR+WSKuujHGfMo6J1RtNAezcnw04zS1fXdMoGA8Zp7M3GctqJHYIDn7ZYHm2ad+FhaId2vZxZlId9mGSQDrwg+axTUdDnryP0In2l3Dw6PjmdOn8ZPuq0Jdjas1Qc4tlmy8Lu2HYX53K+ruhkXwHBVEEeZKAAM0lgh6-9wOlGDicSMp8jjPSl7Wzo2p4uaRt0aNZxzEVKe8tnpn55t1QxdS42xdlXT2DBcBgFQMQTysBhAsCRBfEK7UEA0R6qoU4Lg5B1A-AYOOBMmilgjncEwr4KgsW6t-bODM55WxXhMeh4IcBbzoDVPA+JkRIOUigtoKpZQXG6qYC4KpsGMU6KoLoV0ChviXLoKhdMaF-zoQAxhm9JbYVQLhMA+FZaEQ7qFUoWgJFSOTj4BUlgCEvSNOWOoBpWK+DfvoeRloADunp-qHxRE5eg20AZcJOogfwM5FBCMVJuHSNQ9K6FnHKJcJlyZOKysGH6VI3FbCQp4pa9AkTwmWFgME+IFgC38QrNWEcSw0WUFdDi6orpHAkdg981ElC6GUM4iYaSPGSyyXQVAsAiQlJInIDwZZXDaDqLY+GD9VyvjLK2Hw98nBygqO01QnSiqZO8awiE0DGq6OCtw3I+wlDFHokIo0LFWw-gIccmcLTUqeF1BdEsqz1kZO6VszyBB2F7KvHokOBiejazfrMuiVxWi-mAsUG6dxxm7mfD4V57iNkfKBvQZkLjuyDNCrYXwqhlR3BLK0ZQ6NXC-k3OdHQig-DPTbEi9JwlNlouwhQSEYJvIZmRLAV02KUGNKfMYTo+hpQGkVPjRopQPASLop4Al2Cdz0q6V45lnlcDoF5bkUm9wXyVEokUG6vhVw+BnC4XUsLvw6kUIqlFyrJLbMEGQHAfTfktQBXylpcyTi1FwaZImQ1FRPmfB4ZwBoDbmSSTlLOqTkXvNtc5QQqBfGZISIICAKw6DSDyTCVA+98k4AABSnG4AASjoMkmmriY2MtRWVBNSbukprTfkjViA2gYwMJcKUwrdBkQ1jcsi7aWk3WUFoKF2hrWxqyaoRtKwWZ0mwN7Ru0MAz+15gAK1mNIFtCBhXFFODoDirYVS6QIVUHoDSpQiOAnUQIEbM4pMrQyogTKyozvyXO8W9A1Hb13gfI+J9bDrs3dutoDYUofVcN1FptStDQtfFcSspMdATurXGiYnlUA82-ds7yHCcDbucI+I9ZFLWUTMtcxonQSzlhem0C4m5e0oefTW5yGGsPMPUWDbR27hmVCfJTOF7hUqdFqVUGcNFHFRSKLejO4EK0MMUXnSgRBYHwKRI6eECxFgcrw9ysUPpa7LqhgB4WYAVQEYQxgooetdXYLML+KUGN+49EMHRD+qyy65xZqpiQ6nWRadIBIXTroDN+j9iZvAZnz5tzlpfUKQb7hXUoj0OFigTnkrKA8FUXgdzwo84p7zcA1Oxk0-MbTQWuUhY3hxn9e8sCeOPn7WwpnzP7OOpOKsZYibPXGVRZQFiJXPRlD4SVcTDDwfy+bJR+cfMIJhG+sECb0Bokw4uldQZI0PoU1NpT8JZvqYW6zDAK2IDpkzDyvgIHegYNSiEtoPcdDkoyrKLc8MMqEaKJNrzVt9swhIBh99S2TtreM019ABB0BkQI5uMsnh90flGo9m5OgZytBcHcHwBo6NfdoTNorvm-sA8W8dvAq2clHeW6TnmYgsDzBde3N1uRTAtPLOjUslQlmbnwRKu4ZZ4YlicJRZ8KocfTeU79neXLP0U+B4Zk+AH0DcCwPoKgIHOj3F0ILp5OtfyaAOHgm68K-Ai7vXJk2O8Cs-fx3NyXOAmDYBl1T6rW8d51YawrpXKuCP9XUN1OUrSTksV-IqU58M0vdaWeG2TPFp6edx+L636mgdU6YSwtheGQNzis8egRFwDC-l8IlwCqtFDYP2KL3bKnE8wjY6nzjmi8IEZOQ4ecGVZnGWwfdU974ZTGGFR4FU3hNzGlNzHvKcexd7er6oWv2H0+cLa-olBrgIrCqujddG8r7P9uMocFwxlhGGLqKskgdPUCg3zkiJmWJt35HfE9W+2DWKUTVJYo09wdAuc3O0FLqy4FQKJCIE0VgBcWRBBwbhXVsDXTkHQCwHVUX0Z0QCrAcAuBaToy0GDVXGxgkWelHg71OHL1H1yh7DrSRGYxRDAH3n3i8noEzRTHyV7FzWRHzQKEKFLXLXN1ILBEyUoOoJIHkj+QOQCTCizzIiJW-C6F6k1gVAwR0EuCNFiUMBH2j2IKpDRCZHIIIA0S0R0UEPaxIkoi1E13cB7juHVAMESx0AuT1l3GFVWXUI4E0JcjIDwBcRtS0PUPQh4zTis11DuxLEUC70oz8AaX8D0Coxehk2ynvXk1UAcLYHd1gBcLcNjS0PJyzWQiKXp1i2QU1WFTUE8DKH3VSnMBel-G6n411BilqAyhCXsJ8kcPd3IC8gOiQn+0gAhFpFCzrnCw4OnniKcOaJIFaOEnaPdBYC6LOwTGzEuwQLixQVOCVm8DbURz6go1UkUCs1IUuSuR1Cj2iLN36IaISP-SGJGNIE8nGK6Od0lldz-RwGPj6LygGKaLIBaKKjGM6IjDTD5CzEFFmL0KX01R6AKI8DlGMC1R1HMNYnLD1yhQKAYyOHqI0PdxeNTEgG2TVW8O8HxUH0ERekEW50CXXFYLomemeBUFWV-kr3oQt3Ljr23iSNcKKmwwgAjFYBEGyP+XmKOVuj30MQyno011XANhaFiWcHJi0ESRUKjUtGpP-nLjpMXgZNUFwHZNWDVNQCZCgBAzkJaF0CKGSyqG8CwKKHxR8F6FShMKJipMt3zlpNURq1VJwHVPANJE21iPlOUUVMdJd01JgCmL+K4ABNdR5NbX9wFVMGfHBScFf0aC0HPXgzcEKNYnvltJ2wVMXiVOdm-VVMoFp1WDl16I9PNy9PtJURAVzPoILMDIu14B4z6kih7nODZyNHFUJnnAFV3AF1IXMCuCCCyhYDwHdHgDSCeL+FDNyLsDKGFVlFumfDDwFPVFxRlDVm3FcB6lsOlIOLHx7GmEBEWCzUnMOWnLcznPYmvVLzKNPUcGMHhh6nBOGUuG3PHKpHDEjAZHtGZGPOEL2GaE3MtSqDJLJW70Sg0ilFVnnD8H2NfLDE2g-OjAdFZBBnjCDJ-MnD2AigAs6CAopXbIQFMGKA0H3W-GfBOWAlWXfLpCjEZCQrjBdETGTFTFHJyJPLyAKFSkcB8H8AmUuDcAG0QFbDUAugyg-AQzaHeCINlImBPEHHPywHQpIlsG0nxXnHhlYlbDSyKDrCXGMSJiuGUGMFVlWT+iKkWm8UUpxU8CfE8HyOWJOCFU1gqNKFssCOAn2BgpLOnlMoWiqkBjKhWkWjYTqmQSEMnFqCViLTMFODcCgsYgqEOHBXfAfhcBORMpsnmnsj8qnRQq43mEspQXsES1cuMne13GvPjLlAxjqTIgSjegMHTO+3LPLgKs1VqDUAVFmWkwygXDrCcA3DIiXFLCf2cEavj3hFpKgi5hLj5gFmwCyFATFglillatuAKHxRimqFo16oIV8AxhYkD32HMDkSkq2xnjtOU1pKAQLlXjdk9lWtQWVDUDIq8B7l8AkM1nGXUDcAIL1zlCiNgtNguomorPpO-QeuwWaFMB7iKF0B6j2viilDFMfm-yjJ6CYxfSSAhuMEOHeuqSrEXHKNbGlWZ2GVQIotOtiLeVQynS4PIIRFTRWAhv8Fxt0Hxvh3qBuVcHIl3AVFepUBXy+kpvN2pvpu8WnUZvfStnnQUoZzDLCj11nBYn2DeiqPfALwDTcwqC0u7IxpY3QygQgEaFYuENo2KBcrqCjJcChO7yRu8BLHav9zonHWFunlFsxoNswwZIeo8psuAjMR7UcyJIIrExuwRU-BuiXBfK8vH2BqrzgQJx9t3XLC3FsLQUHjfylXiQpSepUEkplLOon0rwl38zK0C05TtxCwerBRlGGXRl3FqC7jjNbQgtlFzqJgTOwQr0KwTpt0O2T0wyTrqBTqOucHTs5olW8D3TZ0VEMD1hdoLtiKLp7uK1UHaNnQHogAeph2KDcAMCuH0hOQEtQXMGhX6kNzZr1G7qt17qTylwd03p9tSjUDvObx1FMDOF1xullCOvrAqCOGQ1dtjozJvtXs3u9rlqnNQQcTbueiwUVAtXwpSzUBaRVBunlVJXzp3NUMtGXtAYJxn0NogZNo60g1lG2P8EMH9zkFqU7QkVbznFaCbCFsXvN1PygQv2UyvyYG4TCqUsJV908AuA8BUBVvJVOFhOEdAyOGjL-0EAAKAIQVAJwGrvGUfA-AKGEUUCJmbrCgoUqJStaCuncA80TTIJ4KoJoOxuo18GVpOCKA0aCMQB1BfrIhYlqKlPMGRMaKPghuGWHhODuH2A0BKMRsxl1A8t6BqO8ZOIeOcOZNSIhoEY0D1HcFKG8HVtPRZtuyjp1loyNiAZ7BeNOLeOGI+MuK+IWBYu5KgepVOUCYqG3FCdPRohaBSewV1HfhoiwcBriOOKcLRK9EgAhvV3UHcoqDzw0AhQIU-3ocenJM-nTmwekvOpAeaqzN9NuKZJSOEnBsgbYokPImhv3ThthUiUsSSxspXwRKODuBYeWbOrLMutBuVKrJdK1LAB9volkJaQESuFMBFNcGMUg3cEKFIScDGsnxuu21eadOrLpwhrMEsM-HIvMEwMsRipoyuBLDMF1GigHICCAA */
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
