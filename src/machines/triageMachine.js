import { assign, createMachine } from "xstate";

export const triageMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBLAhjABGVqA9qgHSwAWhA7ugHZR4HEDEEWUthsYA2gAwBdRKAAOXdMnSFawkAA9EAWgCMfAOwkAnAFYAHKuU7dAJgDMy48oA0IAJ5LjukmtPG+AFlMA2TV9O73XQBfIJs0djBGIlJw7DBWaTASOgA3QgBrJNjcfGiSbLAEVMIAY0xJaX4BKtkxWAkpGSR5RFM+bRJjNW13TWVlbVNerpt7BEsnPmNNTS7lNWMfYxCwjDio4ny1mGZsuiga5rqG6VkFBEDlEnmA7WNPbS8vZV1RpUMr+fuvNT4+frM-hWIAKGxi5WQABt4hBEslaGlMlsImD8hDoUUEaVyo0qodROIKk1QOdFO41Fc1GpfL07sZHpp3G8EGonAs+Jp2lS1D9HtpgaDcpsCswhaQRJDygAzYgAW2R6zFCpgmLSZSJeMEtUJjTOiC8fC0qj4unMfC8jh+mmZim0HQ8yi8Jh0-TpvgF20iSuQ6PiSol0rlyq9THByChhWK6txgnxIGORL1CEUQyc-mp7kW7nc2i5XmZynMJD8-XUml0XjtrJCoRAnAgcFkgtD2vqieapO0hmc1K8tOM9J8phtXScP3uvy75Om-NrzbyFGo+zBrZOxJayezHUMrj0AUr6mHdiU5K0v3Uji6bWCc89qIKq-bJMQXQ6PPfFcGw3zx83mk6bgXiYLgmh6KLer6j66h2J6WM4LxOjmPI+HcBaaKYJBTDMqi6DMB7KDWQRAA */

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
