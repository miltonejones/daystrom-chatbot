import { assign, createMachine } from "xstate";
import { generateText } from "../util/generateText";

export const triageMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBLAhjABGVqA9qgHSwAWhA7ugHZR4HEDEEWUthsYA2gAwBdRKAAOXdMnSFawkAA9EAWgCMANgAcJZX1WqATAHY9e5Xr7KANCACeSsyQDMDgJzH9yg+od91BgwF9-KzR2MEYiUhDsMFZpMBI6ADdCAGt4qNx8CJIMsAQkwgBjTElpfgFy2TFYCSkZJHlEPXVlEgAWZwBWdTa1b1cHPStbBDd24wM2ttVO0zbO10DgjGjw4hyVmGYMuihKhura6VkFBGnnEmd1dT49Z2V+vUHhpWV1TpJOvz1Ozoc23ydNo+JYgXJrSIlZAAGxiEDiCVoyTSG1CEJyUNh+SRRRKdXK+1E4lK9VAp0UHQ+v1czmcfHmD2uqheCF8WgeRkGnX0d26oPBWXWuWYgtIImhJQAZsQALao1ai+UwbHJYokgmCKrEuonRDKVpdZRXfUAvi-bosimaekGXRed6qOkBIJgzZhRXITExRXiqWypXupiQ5AwvIFNX4wSEkCHEm6hCKBwtS4LEw-bpGZTzFmMkj6WbGX5mI1tQIuzgQOCyAVBrU1OMNclAhyfVO0+mzJPOS2GFt8b7ddT6ByqW78t3oijUXYQutHUmNBPTTTOIx0ryO-saS0uT4Dv4AgxAkEumvZXJzhtkpqzS7XW73R7PGxKYEkdSGdP-QHA9TjtEel6l46o2r7zO0VxOMCtJ6Ko0xtCyxbjJ+XieGYwIOGW-hAA */

    id: "triage error",
    initial: "showing error",
    context: {
      diagnosis: "",
    },

    states: {
      "showing error": {
        on: {
          diagnose: {
            target: "triage",
            actions: "assignProblem",
          },
        },

        description: `Showing the error and any diagnosis`,
      },

      triage: {
        invoke: {
          src: "triageProblem",
          onDone: "tattle",
          onError: "showing error",
        },

        on: {
          triaging: {
            target: "triage",
            internal: true,
            actions: "assignDiagnosis",
          },
        },
      },

      tattle: {
        invoke: {
          src: "speakError",
          onDone: "showing error",
          onError: "showing error",
        },
      },
    },
  },
  {
    actions: {
      assignProblem: assign((_, event) => ({
        errorMessage: event.errorMessage,
        stack: event.stack,
      })),
      assignDiagnosis: assign((_, event) => {
        return {
          diagnosis: event.diagnosis,
        };
      }),
    },
  }
);
