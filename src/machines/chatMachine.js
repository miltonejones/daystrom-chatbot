import { attitudes } from "../chat";
import { COOKIE_NAME } from "../constants";
import { chatActions } from "./actions/chatActions";
import { assign, createMachine } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBECGBPWAXATgewFsACAYwAtUsAjPLAYlgEsoA7IxlgbQAYBdRUAAc8TLIzwsBIAB6IAjACYAbNwB0AdgAsc7gE51AZk1KAHApMmANCHSIAtCYCsJ1XM3mFmg+rknf6gF8A6zRMXEJSCmpaBmY2PABXLB5+JBBhUXFJNNkEO11NRw1dXW5HXQUFOSVfa1s8z10NTQK3JXUauXULIJCMbHxickoaLFUASRZGMVQAGyJsSjA6FKkM6aypXLtFRwNVR0Mjb1097gM6+01zjXKFdV1fAxUDR0dekFCBiOHosYBxMBYdhTGbzBKwMA4IizRjYOgQCRgVQcABueAA1si0ZiwHZUBj1HhuKs0usxBItvZdmp1IdHHJSiZtA9LggFPs3KVjNwFIdPC13sFPv1wkMoqMUaDGHNGAAvMBEMAsKAcZEwYEQqEwvAkShZBFIqXorGqL5iyIjWhSjayhVKlVq1Qaoha6GzXX6iQIHF6ilcPikoQiDaUnLUuQGFyOJRKArmU7cbhmNktTSqAp7dQKbnqJMmD7mwaWv42sHyxXK1UsdVAnV+rJECBA1CMWawQ01424s2i4u-SUcW2w+1Vp0uj0NiRNltt2A+ljoqcB3hB9Ih-1UvIdNS6AzJwrcLo59pspQMjTeWOvbixve6Qt9n4S62oQSCBZYVA4ehr8mbcM8m0JRVGTAwDD3aoOkKQ42UjPxVC8Z5HD0DlPG4QJhSLZ8rTGN8P0WH8VjkVJg0yMNQG2dwFFUBQD3OYw3GUNw2SqQxVBMboc10EwlD5ApHzCfsXzGABBEgSDAQQxBVIh0UYSSQUEJI6D1FhJNmP8NwAyjEE0dNtBKVCGUjao4LcIpnD8BNmK8JRBO+cVcNUcTJOkjgoDkvAFMVDhlPoMQCDARJkj4NZtIomRECjNRtCjZ5k2cSoLhseRs32DoqjjMpwOeAwHItAdrVcqSZM8+TFL8pJVEI4EKsVHAwBIPBWFDFhOzALTyOyXSEB0ApQIsXjIz0FDlDgyo1C6PilBaV5OLcArhOckr3Nk+qlOq2qvJ8ohGua1r-Q6zgSPC7qtzkRQmn6vjDF5Lpujg7M5AzGN9yUCDI0qJacNLVayp2yqWH8mqvx-QGGqalrpQkOg3SIL9ZgxDyurarcVDURLyh0So-AMOQ4IwtQ+WzcwVDkEyfqcv6JNKjyIc2sZ4bUjSOu7U0cSxOxlAxKBUFRzdAN4jjPDePQ6Q5fHNDg5x9iPHluiPcxNEwvohN+yUAAV8Ek2BYBLIhBEGaSXPfZUICIABHBI4H9BG8CIMg4SwPAcHQFYwrJCKeqi9lcto9xwOuDkhul1KEB4l7vAsJMcvcB4qZLLWdbgfXfkN42xgAZXNjPCGk+2iH+TWABU2c57FF1xOx1DzdoBZ032jC0YoHn3HMfAsNlThcc9KhViDuBV1WRXV6nk91VODaN-Ps9zmeCALl2i9L8uq459e8Vr291BO0j13OwCIJMNQUI+ko+Ty2Nu9m0C8z3WaLBV8pE6KsZtcnvXp8z1Qc5YC2F5LwdsXMuUJ8A4FUIIWYlAABmrsCDsy3nXXensyJo0AvcRkGgVBVD8NcTME09CgX0NmXiGFzx6FfiJVQH9dZpyiHnRec9-6MKASvMuAwwCoGII1WAwgWCQgbpFXICYQIoWZNUaOmgnBsh3JeOMJRGR0XwVQ5ytCp7p0AWMLRSocDgLoPtPAqIoRCJ9iI5QvcuLeGcHGRQ5lkyXmjuBWMThOKqNLOor+mif46LAa7VSqB1JgE0qgg+6DeqTWJjGbMsZKgcg+nBUoIFeQmB7vuHidECxYSfOPa0AB3VsAM4HQiqvQLUENTHo1eK4Rw9wvB0kurNJQcEnDE1Qh9RwXh9KvHcZKApGxZLFMZnQVAsAMSVMAoybQg1zzVH0IxaRT0W4zTKEmRkSsFC9PyYU+mQzSkGOVNwzqoT-zCMQCTIoeUIItDzMYU84cSbqGaEyI47hDj2WyWPJO2yBmeT2cDFSjUCBGOOfvU5ZjzmvDEe4bQhxnhxhVqxPiRQagIvPM41JWyxj9KKa7YZNY8klgmb1fITQTjWLAoYHwuhWKD1uEPUaKs1kj2wrk7FOzBl4v2cMFUipmqLihLAL0K4zrhN9nRF6e5zC1NrvjN4NKHmTQzAYKozwLAyq8Fi1QOLdlcoBfQRquB0DEt9hTXwqhkJ1KHooRQzTw5uBVcQ-w8yPpVE2Z8xy3z2W-KIP8-yBzBBkBwKM0ForBa9S6C0bBDwWglGzHoO19Rqg3GUIcbonTbxOBZTkr12qOV-L1f65sswgSKg9NWE1uRLrXAtXsU40i4VeDZFCkChgFr6GUOePYWqdWcpKfqyBqBylDISIICASw6DSEWFgZEqAYEzpwAAChQtwAAlHQVlube0Fv7SDQQQ7IS+rxaO8dM7K3yH0BavMRhxFHkeATB5cYiiFBKMyXQpgkwPg9YVah26j27uqvu4dx6x0TqnV+Gdqg50LuXUmddm6355p9X6wDB7FQjtA2e06XtD4RpjKBDC4EuhOFjDUdQrE-BPMaJ03iN5BQ9vzf+xmqgT1LANrCeEiIuwV0QXYS2AAraY0hz0ICza4Iw76-D6FSRhZtZQXqpNaFoXiOZ3Vq09Yhv9KGmaYb5Qwjj9A-EQKgbA+BvGBNCZEyTC1Rh9I706RTWaza2iIQeKURpDJlAMeQ4W6qjVUAQHdpCYE07FSojmDbETkinnIr0E4SobhajhxVfhx4yZrwqGuJq79y1Sxad82MfzFsjMHOasYnAIntAuBzLUjkBRsw8WZM2vkL067SLspGFo3ncUAcK1w4rej-Es2CVZoeLhbwUwqPuWpbxHDNqqxa9o+M6Rn3fUKdTP7nL5d6yxyE0JyDeUknQFgeAos8TlsYLQI0cHeAo-uK9Ej4sYwpt13VO3mZkEO8sdAcAot5holZKCw93CJvOfoBTzh7p8nPHudbo8NPUJnnQg2vD+GQmdHWOY8x+XlaFf6DsXHK4miJ9XF2YBDgieeDWlCK7eSvDmXNh5jSDgQRzCfJCTgtVI40Qw1HEh0cuix6QCQuPhUE6NDxiudgycU+w2g8NTcFEWpfTmYwnm6S0rcBxV429IxvHAlzlOXjedwDR7WYEQuceCrF3QIzkDoFYGKQgqXMuUFgu9luQ8p8FrGEzPcBQrEfAKYqIyFVyY9DVEN5-ehlA9qm-58iVjM7DYYA9AFtexPexfMQ9z43se+cCMT7plP6A08QAXEuYVKQrPxgOO5tC0rOm0rMLRbMtTTAh2uHDhDiOjcx+BAX9HJB-PJ-3aXvA6fCeIN4+gAg6BTCU+8GoTiNPuinHPGHeofIVaIWVnGVJJgVWeCj8j9Og-kTD64aP1PE+IAMDrGPsvCNpglsp0ZWiGE6s5gm7yJFzJXAxq+BmDtDJgn48757x6F6QKCrOwl5l4Z49hS7oDcBYAmBUBWb4xNAsivBBzRysRvAgQNo1B7A3qHBgF54D6QHo6CAwHYBwG3626DbGYO5O4z4oFoGU73QEYVD6SKB0hDyB50gWrMT3DOCypeY5YazWi5795x58IJ6Drj4Ba6L6KGLlZWbuCnxlDZjXAMqLIPIFBkrcTBw2rIrkGyHn6qBFYqFDaBIaSU50hyweBpYSqmByY+CgRRiMhZqUrZrZ697R4o5UHIjWElZqEmInIe6AT6SVAcSdY1DDQ1CnBIp0QcTMjKJlBVCSJaokAlrfgGyQh6wGgiY7C3ggQ3joQ8Q+C3YPKs60QoTaAJa8Q8Fap8JcIYhECBKwB5JQgIEbzE52D8ZyDoBYDGqRG4a+yHj7DXBaD9yTaH4yxEJdBmqTQUy8jd45o55oZMZgAwIwJNT0DgZLBQbzpQiLo6BwYbqbGI7bFDK7H7EkChTu4TFVqaGqCmDQTLHPD3DdxvBxHs4xEfQ1CaBarlocD-oEABJBIhLPFiq5DlBFASK1w8QxgKr1DSJkqdL6Cxw5R+CgktTglO7HZgCEqoASSJAsBPFhqNzmIVDiYxqjSzQCH2pa57jVGeBmCcT3D5SSFsqqBglsBEnFJQC0Ap56x5KuwQBRa8QGQXwnwPzyyb72DRwHAOopYzQ6Cxj4nVgQn34hYQZhYRaho4ZwnyBHgKbMjtAZoWDkbhyzTXQzYpLkJDTamElmawCfZ5JvaQnloghRZ7AA7nD4xoQdCKBWDJaXSgSdI1Z1qiyumClmbkBNTIyySX7NiUkyjth9HIg97OQCkQmqBJkkApmeRpnKhgjzi+hV6BjjGmkIDSJPK3hTbPT6RvopRb6H4WqcTGBIT6QMgqzxkFlFklmkCNTpkVmMHgL26mY4AIK5mlj5msHDn0xlkZlzCVlVzLjV61kK5VqqYcQZLXBSwKLtl6QUwHnSKZGXQ1bniDmsGLmtgloDaqFAhux-bKCvSPDeCMjRmXRsjiKeHvpPC2qzJ3lmYThLB0GrkTlT48bzmSiLngV1gO62yjmQDlmZkbmV7+jbmwm7lpTmqRj-ZeDMh5i-72oYQHCyx8SpL6TvpDw5Ej6KhknNQJCUlQn2E7k0nnIg6gRdIqruCRqnkRws6XwOrmlSaMVX7MXklsVjAel4CEpEmwAJBUAEDTCcE1Da5hmXQOr6CyJqB8Tfl2RXjuBSVsYsUUnyWem6nBafhsbhazCRZcVnIIBqpPIwqXS8TlCH7nhsgOCNmolxLaDPyYq8m5qX4WWyWUk1SqXqXAjNhfhzjZlZ4I7OSRXJ6WVyWxVqXTAzhJXtgV6eg4U1l4XcXsgSKuAIoxhGWuKJJkoqxOAVAXIMjmWZXRXyVxV5WJWPkdh24maO5mbwXWgZUyWsUxUqW5UJWziFVVklWrguUQpuWZEZjnAJZxiyrhn1AQRPKQTeB5jTQxFtVjVWWFkj6NgwKPmQA2E4AHJGqU6olUXzTXAnyNK2nbXvqIT4xOIyolAfIba5aSijWdEdVnVX6NgqW0x6x0C+kcBWa+BFBaBVaFArY5jCVKqHAxFXhvCeAdBarCmin7rimSlEASk4AYgwIeh5IcUjaLVbh0S8jvEbJ0Rr4ciM71B2ANG0R0R7AWCSy5T-Xw6balgE3AhE3dEk1k0U1U01Q2XKVdVUkmn4V9QlBFDaFsnNXbyg55A4zRhXZXxYnfThWIai1ikS04AWxS2U2KWy2KW2V1ihZyRGkaHlAEbdDIqoo8T+WNIWlLbu07iLTG3UKm3i1k2W2uzS022TXxX5W9UpXDVjAh2jLm3h3k3W15I5Ux09VzhFVbmlXUmuVdAQQcQvUMjUoPB8j+WuLvExSCh4Lvp+FpUi2uwili3J1h2k0R3p2Z3dUzV9VMHTmDWzmpXC2ShJ3E0W2d1p0y3R290FVYXFVZC4UF1LUSrphVFPCKacTMkc1LYEY65xJmpZIA1SGJ0t2E3t2S1d0z3lnC4sAwKMCznCp0CYgYB-Z7gZicSH4h6CjjThzcydm1w43JRXTdn43n1t0T2p2R0Z28J1iXVtjXVhGvljFlWuUcg1o+CZI8RHhYNKl5DpEWoVBxjKBsSFBarFqlpoXjmZlx7NQW2qCUPJ5EnDYwkr0XTMQZjSLKClDeBs3Nod675XiiH1YUPBJUPQW0OGIMNMPobwIIj4CCBRYJSIT6QqCtBAnXzJaPDRg67IQqwuIglB3OSyPUMYVzB0OSmMOKNmNrmzDx3XEmPiPJ6SMWPSMQDWN4AfiuOzC53VkLVoNLUUyHAcSdKeZSyHDvoCO3ymGTSdJ0jtBiMlouNjnmPzDuOePeOpN2OTmuyD2sEJ2MPON8rZNgiWMyM2M+N+PzX+n4a8jvoCXVDdmphKy76f7tDmC2qN2j3WimM+PlMeMQCVOlO0PINlYRGBMXTeEaAciGDVDKD6S1yphPBVU4FgTGAQQbH+HOSAjAhDhlPwwGa5PMEznO6bz4iEjEglEUwdBM3vruCnD6Pe08QHBDxAmpKkJxiC2FOHOwFjMgoVZ02AQ7B3CLZYwxzOB7j+UdKuAYSMjKZGRakfAnbNjwBpAJ3sPAvVA1oJROBWRlCpLCU7DOJpEfr7jpHGBaqTDDj2UzqYskrwQvQ5i7AciKDMv4N2CzQ0R8jKws3tCFBqZC2A3Wi7Mgg0u-PYD0u+zEtELBkrFtY1Ec3JSvPGCiG+CHhIsn18n7OZkVgOjVhgBSvbC7AgTEF8TzPxqVCsSpE7y2owpeBs5ao6t2iViOhdguiHOL2RTgpbg7CZLvGOZZT+68gB7JaUXRKTYxjKC8jdPCtjDOsjiusGsY7AiTjCqx1zhGvUh6C0ipIMhAm3gqyhv1CxK75JTu3Bwchar4T2U-hZtAQIQ4ILPvo1D3BlBniOp64ylttGC8har-T0wbSlL1s7CRnZiGBvCKC3iRPdzVJ0ikL4zNEN39u0xrTlRfbMbbQbSGKHSNw+uAS80Zg6A413I7Xa02pYEpI8tvArYrtuQAxDsDrMx2HBIjsfQzMTuebTsPA73yD+5pH3wtsSrH7GMeJ97fyzz1uBvvEPAXEMhmCixnjsSzM6DIQr4JygcTyn4MJaKmw0EsLWy2yNjLxOzYCuz1Dy7lXVA6AwdpbyYIeFDdzGB8X8F8i1LaBaqeKyG4d-wAKZyFwgL1upo0TPDbxNUsgPr1AFDJLPzrHsdyCcfgfeKzyQL8dGZCcI3YJVZB48QVDs3yCMgvTwvtAId7j7WvZ9qMxQcOJJhHDEY1VkasTJguBSpBznikaxun1IY9bMZAaHoYanqGtK1Ucf21LwofMfR0jGCsQqxRx8jnCXRAVBkWc7rMZJ56ax4GZQeXrPCq3zLVD65yZJjc24KTaGTH1CtefbbMZFYUdhLK3+AZQtCtsqBhPuEuATvtzIkrY8latbqMbaZWH9Y3VCcvNHiyyRgqo9z6TNrWIByTe1J4KLMpdMalK7bagHY+RQcPCBUwTgQFCFDa2ppPJ4I+DyqjQKeYfSFKcm7yGF5Cd+BFAdr66ckFDCWMhje8SzR3JPDZZ9c543cQF3cC6Y6zDY4i7W7471sdauA8ToqommBonnLVq0R9x0iPdZTmFBHA9F6Bf0EBYPfvvPe80JhNoPKJQHBfe1wnyxxGP-cBHYdA9m5g1saP6371tL7PrKZNIsi1L4F8hM1ZQUxxSs5Y9n7BHQE4BMB0Fs8E-BfoOlA0RrWOFme8PvXnIxhMtsezIVDqp0+Vd8kyHY-M+y-PmuyjfSKo+dwsg+AxqsS15aDvI+0ym9cG+5pG-i849DfKHqfy9LX6Q1rcT0e8i8FyZaW62aHxyxhbNN1A15H7YMKFFMDetREkobUEbdlxakwMi0ooSvT4JNG+XfOOOlhtEEidECI9E4DQ-taw9q4gH9za3vo0SEsPwfR+B3hc63F4r3EHHWe3MFBDxs3aF+BbWIBSqgQfrcOXTOC1JgWzlQfws2ZBUoTrL6c63tAl3pRravB7BdDz8IIKVel9oEBQfp9His4V06Anzq9uVdAl2rLMg+H6Cu+FOIXD3LmpkjPrlQeizL8kOr9Sg6-VXMriHj3Mi25QLQAf35IElBSV1M3tXz94XRMCk-SoDwQZRMR-yNnCCGRi666doBEFGdFBW-7thtu55JJG4FH75ciWJ8ZXDoQjyxh5M+vQpsDSyqUkhOnSdegih0BeA5kknakC3AIIVBxY6RCCK-xL5A0mKINcatZTtpO4OeZwUCFUC6Q-kaK+DPMO8RQ4mVoIgrFgVILYGdUpqGbUgUgKPg7xiEhQPwBTE4he1FUnICoEkm8r7hzgxfbZqWFYGg0MqF1eASN1MG9QiMLfW5J5lsTmBm0n1XgT9XuB-Vjq0g06l4OnCQ06EHAuku+laBDx8Ytia1qfCRqzMu0uNCroU3Hop0p6MDM-o8Af5OBli+gPTt7UaBdl2gPgJMGmkUDgMcArdM2h3Stoz05a8CITiqklR4sb0-2W8ES11oHArsX9dYhUFaHtDQ6V9aelHQVrGC0WlHdBrHA4gYRoyvA5NDQPPAHluSmSVJKIRmEX0oGJQ7upCEpJ30H6T9BXPuwjRaBW0w0WuB8UgHr9OWgg84FZA+gvUByV3M+m0NOHFCuhNtOBsCAQZPlfBqw1eigI1INDvubwaFp8IShZhDAojf4UU2SYlN0KdjAZovzz7pQ5mM0RZrfy8LPo6IfcSMH9U858k+mJAgZpiKobyC-BpqaZuDjlRoRiMYQ81HsGiTdAUshgVwbH16bFNbGZTDJkMy8ZijMyUHMuq4CarTssiL6MIYzWEGmAZUeMRJhiLpE4jxRUMCplKP6a+9oRF0LMBoD0CYF6cNqZZhoPuaeAp2gcLVBK2BDGj6u5VEFi3kUDT92SXQfyrwMp7udDubmaYUEACBAA */
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
      fullname: null,
      email: "you@example.com",
    },

    initial: "Initial state",

    states: {
      "Initial state": {
        always: {
          target: "Get initial user list",
        },

        description: `Leaving this here for any future preload ideas.`,
      },

      "Get initial user list": {
        invoke: {
          src: "loadUserList",
          id: "invoke-ak7o0",

          onDone: [
            {
              target: "initialize engine",
              actions: {
                type: "assignUserList",
                params: {},
              },
            },
          ],

          onError: {
            target: "user list error",
            actions: "assignProblem",
          },
        },
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
              500: [
                {
                  target: "user choice",
                  cond: "account is new",
                },
                {
                  target: "update chat list",
                },
              ],
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

            on: {
              "set state value": {
                target: "ready",
                internal: true,
                actions: "setProp",
                description: `Update the value of any state parameter, including the chat prompt`,
              },
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

          "user choice": {
            description: `User can decide to import existing chat from localStorage`,

            on: {
              no: {
                target: "ready",
                description: `Ignore localStorage conversations`,
              },

              yes: {
                target: "update chat list",
                description: `Seed dynamoDb with localStorage data`,
              },
            },
          },
        },
        on: {
          "use voice": {
            target: "Accepting voice input",
          },

          ask: {
            target: "Process chat prompt",
            description: `Send current prompt to LLM`,
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

          "delete login": {
            target: "delete credential record",
            actions: [
              assign((_, event) => ({
                loginKey: event.key,
              })),
            ],
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
        entry: ["clearSession", assign({ newuser: false })],
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
            },
          },

          "checking credentials": {
            invoke: {
              src: "processLogin",

              onDone: {
                target: "#Daystrom chatbot.initialize engine",
                actions: [
                  "assignLogin",
                  "clearSession",
                  "assignBlankConversations",
                ],
              },

              onError: "login failed error",
            },
          },

          "login failed error": {
            on: {
              retry: "showing form",
            },
          },

          "get latest credentials": {
            description: `Load encrypted credential list from dynamoDb`,

            invoke: {
              src: "loadUserList",
              onDone: {
                target: "showing form",
                actions: "assignUserList",
              },
            },
          },
        },

        initial: "get latest credentials",

        on: {
          cancel: "initialize engine",
          "new account": "create account",
          "forgot password": "forgot password workflow",

          "set state value": {
            target: "login form",
            internal: true,
            actions: "setProp",
          },
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
                target: "creation success",
                actions: "assignNewUser",
              },
              onError: "creation failed error",
            },
          },

          "creation failed error": {
            //...show error message
            on: {
              retry: "show form",
            },
          },

          "creation success": {
            on: {
              "log in": "#Daystrom chatbot.login form",
            },
          },
        },

        on: {
          cancel: "login form",
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

        on: {
          cancel: "login form",
        },
      },

      "delete credential record": {
        states: {
          "delete form": {
            on: {
              cancel: "#Daystrom chatbot.waiting for input",
              drop: "drop credential",
            },
          },

          "drop credential": {
            invoke: {
              src: "dropLogin",
              onDone: {
                target: "#Daystrom chatbot.waiting for input",
                actions: "assignUserList",
              },
              onError: {
                target: "drop credential error",
                actions: "assignProblem",
              },
            },
          },

          "drop credential error": {
            on: {
              recover: "delete form",
            },
          },
        },

        initial: "delete form",
      },

      "user list error": {
        on: {
          recover: "Initial state",
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
      "account is new": (context) => {
        const talks = localStorage.getItem(COOKIE_NAME);
        return !!talks && !!context.newuser;
      },
    },
    delays: {},
  }
);
