import { attitudes } from "../chat";
import { COOKIE_NAME } from "../constants";
import { chatActions } from "./actions/chatActions";
import { assign, createMachine } from "xstate";

export const chatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBECGBPWAXATgewFsACAYwAtUsAjPLAYlgEsoA7IxlgbQAYBdRUAAc8TLIzwsBIAB6IAjACYAbNwB0AdgAsc7gE51AZk1KAHApMmANCHSIAtCYCsJ1XM3mFmg+rknf6gF8A6zRMXEJSCmpaBmY2PABXLB5+JBBhUXFJNNkEO11NRw1dXW5HXQUFOSVfa1s8z10NTQK3JXUauXULIJCMbHxickoaLFUASRZGMVQAGyJsSjA6FKkM6aypXLtFRwNVR0Mjb1097gM6+01zjXKFdV1fAxUDR0dekFCBiOHosYBxMBYdhTGbzBKwMA4IizRjYOgQCRgVQcABueAA1si0ZiwHZUBj1HhuKs0usxBItvZdmp1IdHHJSiZtA9LggFPs3KVjNwFIdPC13sFPv1wkMoqMUaDGHNGAAvMBEMAsKAcZEwYEQqEwvAkShZBFIqXorGqL5iyIjWhSjayhVKlVq1Qaoha6GzXX6iQIHF6ilcPikoQiDaUnLUuQGFyOJRKArmU7cbhmNktTSqAp7dQKbnqJMmD7mwaWv42sHyxXK1UsdVAnV+rJECBA1CMWawQ01424s2i4u-SUcW2w+1Vp0uj0NiRNltt2A+ljoqcB3hB9Ih-1UvIdNS6AzJwrcLo59pspQMjTeWOvbixve6Qt9n4S62oQSCBZYVA4ehr8mbcM8m0JRVGTAwDD3aoOkKQ42UjPxVC8Z5HD0DlPG4QJhSLZ8rTGN8P0WH8VjkVJg0yMNQG2dwFFUBQD3OYw3GUNw2SqQxVBMboc10EwlD5ApHzCfsXzGABBEgSDAQQxBVIh0UYSSQUEJI6D1FhJNmP8NwAyjEE0dNtBKVCGUjao4LcIpnD8BNmK8JRBO+cVcNUcTJOkjgoDkvAFMVDhlPoMQCDARJkj4NZtIomRECjNRtCjZ5k2cSoLhseRs32DoqjjMpwOeAwHItAdrVcqSZM8+TFL8pJVEI4EKsVHAwBIPBWFDFhOzALTyOyXSEB0ApQIsXjIz0FDlDgyo1C6PilBaV5OLcArhOckr3Nk+qlOq2qvJ8ohGua1r-Q6zgSPC7qtzkRQmn6vjDF5Lpujg7M5AzGN9yUCDI0qJacNLVayp2yqWH8mqvx-QGGqalrpQkOg3SIL9ZgxDyurarcVDURLyh0So-AMOQ4IwtQ+WzcwVDkEyfqcv6JNKjyIc2sZ4bUjSOu7U0cSxOxlAxKBUFRzdAN4jjPDePQ6Q5fHNDg5x9iPHluiPcxNEwvohN+yUAAV8Ek2BYBLIhBEGaSXPfZUICIABHBI4H9BG8CIMg4SwPAcHQFYwrJCKeqi9lcto9xwOuDkhul1KEB4l7vAsJMcvcB4qZLLWdbgfXfkN42xgAZXNjPCGk+2iH+TWABU2c57FF1xOx1DzdoBZ032jC0YoHn3HMfAsNlThcc9KhViDuBV1WRXV6nk91VODaN-Ps9zmeCALl2i9L8uq459e8Vr291BO0j13OwCIJMNQUI+ko+Ty2Nu9m0C8z3WaLBV8pE6KsZtcnvXp8z1Qc5YC2F5LwdsXMuUJ8A4FUIIWYlAABmrsCDsy3nXXensyJo0AvcRkGgVBVD8NcTME09CgX0NmXiGFzx6FfiJVQH9dZpyiHnRec9-6MKASvMuAwwCoGII1WAwgWCQgbpFXICYQIoWZNUaOmgnBsh3JeOMJRGR0XwVQ5ytCp7p0AWMLRSocDgLoPtPAqIoRCJ9iI5QvcuLeGcHGRQ5lkyXmjuBWMThOKqNLOor+mif46LAa7VSqB1JgE0qgg+6DeqTWJjGbMsZKgcg+nBUoIFeQmB7vuHidECxYSfOPa0AB3VsAM4HQiqvQLUENTHo1eK4Rw9wvB0kurNJQcEnDE1Qh9RwXh9KvHcZKApGxZLFMZnQVAsAMSVMAoybQg1zzVH0IxaRT0W4zTKEmRkSsFC9PyYU+mQzSkGOVNwzqoT-zCMQCTIoeUIItDzMYU84cSbqGaEyI47hDj2WyWPJO2yBmeT2cDFSjUCBGOOfvU5ZjzmvDEe4bQhxnhxhVqxPiRQagIvPM41JWyxj9KKa7YZNY8klgmb1fITQTjWLAoYHwuhWKD1uEPUaKs1kj2wrk7FOzBl4v2cMFUipmqLihLAL0K4zrhN9nRF6e5zC1NrvjN4NKHmTQzAYKozwLAyq8Fi1QOLdlcoBfQRquB0DEt9hTXwqhkJ1KHooRQzTw5uBVcQ-w8yPpVE2Z8xy3z2W-KIP8-yBzBBkBwKM0ForBa9S6C0bBDwWglGzHoO19Rqg3GUIcbonTbxOBZTkr12qOV-L1f65sswgSKg9NWE1uRLrXAtXsU40i4VeDZFCkChgFr6GUOePYWqdWcpKfqyBqBylDISIICASw6DSEWFgZEqAYEzpwAAChQtwAAlHQVlube0Fv7SDQQQ7IS+rxaO8dM7K3yH0BavMRhxFHkeATB5cYiiFBKMyXQpgkwPg9YVah26j27uqvu4dx6x0TqnV+Gdqg50LuXUmddm6355p9X6wDB7FQjtA2e06XtD4RpjKBDC4EuhOFjDUdQrE-BPMaJ03iN5BQ9vzf+xmqgT1LANrCeEiIuwV0QXYS2AAraY0hz0ICza4Iw76-D6FSRhZtZQXqpNaFoXiOZ3Vq09Yhv9KGmaYb5Qwjj9A-EQKgbA+BvGBNCZEyTC1Rh9I706RTWaza2iIQeKURpDJlAMeQ4W6qjVUAQHdpCYE07FSojmDbETkinnIr0E4SobhajhxVfhx4yZrwqGuJq79y1Sxad82MfzFsjMHOasYnAIntAuBzLUjkBRsw8WZM2vkL067SLspGFo3ncUAcK1w4rej-Es2CVZoeLhbwUwqPuWpbxHDNqqxa9o+M6Rn3fUKdTP7nL5d6yxyE0JyDeUknQFgeAos8TlsYLQI0cHeAo-uK9Ej4sYwpt13VO3mZkEO8sdAcAot5holZKCw93CJvOfoBTzh7p8nPHudbo8NPUJnnQg2vD+GQmdHWOY8x+XlaFf6DsXHK4miJ9XF2YBDgieeDWlCK7eSvDmXNh5jSDgQRzCfJCTgtVI40Qw1HEh0cuix6QCQuPhUE6NDxiudgycU+w2g8NTcFEWpfTmYwnm6S0rcBxV429IxvHAlzlOXjedwDR7WYEQuceCrF3QIzkDoFYGKQgqXMuUFgu9luQ8p8FrGEzPcBQrEfAKYqIyFVyY9DVEN5-ehlA9qm-58iVjM7DYYA9AFtexPexfMQ9z43se+cCMT7plP6A08QAXEuYVKQrPxgOO5tC0rOm0rMLRbMtTTAh2uHDhDiOjcx+BAX9HJB-PJ-3aXvA6fCeIN4+gAg6BTCU+8GoTiNPuinHPGHeofIVaIWVnGVJJgVWeCj8j9Og-kTD64aP1PE+IAMDrGPsvCNpglsp0ZWiGE6s5gm7yJFzJXAxq+BmDtDJgn48757x6F6QKCrOwl5l4Z49hS7oDcBYAmBUBWb4xNAsivBBzRysRvAgQNo1B7A3qHBgF54D6QHo6CAwHYBwG3626DbGYO5O4z4oFoGU73QEYVD6SKB0hDyB50gWrMT3DOCypeY5YazWi5795x58IJ6Drj4Ba6L6KGLlZWbuCnxlDZjXAMqLIPIFBkrcTBw2rIrkGyHn6qBFYqFDaBIaSU50hyweBpYSqmByY+CgRRiMhZqUrZrZ697R4o5UHIjWElZqEmInIe6AT6SVAcSdY1DDQ1CnBIp0QcTMjKJlBVCSJaokAlrfgGyQh6wGgiY7C3ggQ3joQ8Q+C3YPKs60QoTaAJa8Q8Fap8JcIYhECBKwB5JQgIEbzE52D8ZyDoBYDGqRG4a+yHj7DXBaD9yTaH4yxEJdBmqTQUy8jd45o55oZMZgAwIwJNT0DgZLBQbzpQiLo6BwYbqbGI7bFDK7H7EkChTu4TFVqaGqCmDQTLHPD3DdxvBxHs4xEfQ1CaBarlocD-oEABJBIhLPFiq5DlBFASK1w8QxgKr1DSJkqdL6Cxw5R+CgktTglO7HZgCEqoASSJAsBPFhqNzmIVDiYxqjSzQCH2pa57jVGeBmCcT3D5SSFsqqBglsBEnFJQC0Ap56x5KuwQBRa8QGQXwnwPzyyb72DRwHAOopYzQ6Cxj4nVgQk1SfZ5JvaQnloghRZ7AA7nD4xoQdCKBWDJaXSgSdI1Z1qizamElmbkBNTIyySX7NiUkyjth9HIg97OQCm6kekkBemeQ+nKhgjzi+hV6BjjFwl6ScSgRxgcjPT6RvopRb6H4WqcTGBIT6QMgqyumCnulkCen0zRl+lzAdh24maO5mbBmlihmsHhmRmkCNS+mxkV6ej+jV5JkK5VqqYcQZLXBSwKI5l6QUxjnSKZGXQ1bnhlm6ltmtgloDaqFAhux-bKCvSPDeCMiOmXRsjiKeHvpPC2qzIrmsEThLB0E1mxmBlZ4I4hkEnlk4AIJ3kzoPndkxn+lxlVzLiDmwnDlpTmqRj-ZeDMh5i-72oYQHCyx8SpL6TvpDw5Ej6KhknNQJCUlQn2FDk0nnIg6gRdIqruCRrTkRws6XwOpHi+CMgYVX5YXkm4VjCwD6kQkMAJBUAEDTCcE1Da42mXQOr6CyJqB8SHl2RXjuBMVsbYUUnsWcVEnBafhsbhazCRaEVnIIBqpPIwqXS8TlCH7nhsgOBPJlDplzHPyYq8m5qX7yWsWUk1Q8V8XAjNhfhzjPktmSgOXJ4KVsUuW8XTAzieXth9nAWJmgVEXsgSKuAIoxiSWuKJJkoqxOAVAXIMhyX+VOXsWuUhUeXrn1lMH26mafkvmbalh+UsU4XOWwD5XuWzjhXxkDlRXUk6XTY0SlBH5zKyq2n1AQRPKQTeB5jTQxHZU1WKWqB+WNgwLrmQA2E4AHJGqU6omIXzTXAnyNLkbJbvqIT4xOIyolAfIba5a+WYWdG5XTUj6Nj1W0x6x0DGkcBWa+BFBaBVaFArY5hUVKqHAxFXhvCeAdBarCmin7rimSlEASk4AYgwIeh5L4UjbaUQrshJg0TkxxIYSpIciM71B2ANG0R0R7AWCSy5QnXw6VWSig3Ajg3dGQ3Q2w3w16l4CEoqUNVnanAOltwPCVDbyg55A4zRhXZXxYnfR2WIbU1il004AWwM1w0s3M2s3wL34hYQZhYRaho4bJnsgvoEbdDIqoo8RmWNIKa8RUpm3kwgni3UKS203Q2y2uyM0K31XBWNVhXi7cabwVVnXWi22jLS0O0w3y15JBVuWhVFURUJmrjI0XSGBNDMiJTLH6AVC432CuLvExSCh4Lvp+Gvmlh+0Q0y1Q2O3B2h0FVNXFXgKlVNnlU+W+2uwik03+323F1B1M0u1h2FVziR2tXR3RU6USrphVFPCKacTMl41LYEY65xJmpZKnVSFjAF0B2t1O0h2QiUnC4sAwKMCfnCp0CYgYB-Z7gZicSH4h6CjjThzcx5m1yA3JRXQFkg0N1g3N300l1M28J1hzVtgLVhHbljH90o0cg1o+CZI8RHigNKl5DpEWoVDpl8SRobH+HOTFqlpdmQD-lzBx7NQy2qCoPJ5EnDYwntUo22qSrSLKDdXpSp26Ud675XiiH1Zar4N8p-m1nzCGK4MsNcUQD4CCBRYJSIT6QqCtBAnXy7Xmp7Bwob4dCmBW3z18ncOPn+nYOSl4N8PoM9n+neXXEoPBJoPKNYOcMQDqN4AfiGOzA91ZAgUkMXRvBPJOCFCKBSyHDvrNqxjpimGTSdJ0jtDMP6PJ4WOqNcMaMWOMFV2NmsF11jBKNsNgjBMmO8NmOaOYOWMtXWNtVa1gV9QEGgQnjkXVAFmphKy76f7tDmC2q52U3WixMYPsMJOmPmNxMqN-1lYRGAMXTeEaAZn4wzT6S1yphPDxU4FgTGAQRIN52ShtnK2qWhZyQa1Rb0VpGXYZoWA7X1CzTXQzYpLkJDRBDCgnbNjwBpDRO2OAQ7DuBNA5i7AciKDXNQM7DOJpHtBtD6DtCdJaqTDDhqUzpnMkrwQvTXN8i3OVCPAPOzQ0TAvpHkJaC1JaqAjAhDjxPwwGZ-O+yPNEKWkrFtY1F43JQHBDy3QMjMhnzk3RNlj+kVgOjVhgBovbC7AgTEEIO3R0SVCsSpE7zLFuC+OJVapIuUujiOhdgugov9mNzgpbg7CZLvGOZZT+68gB7JYIXRKTYxjKC8hVM+1jD8t2iVhCvm71jCrh1zh0vUh6C0ipIMhAm3gqyKsbN8S75JT63Bwchar4RqU-imtAQIQ4LKAtCxh8FlBniOp64yn3AMS8har-T0wbSlJes7D2nZiGBvCKC3iuPdzVJ0iGDVCXQ8StBRu0xrTlRfbMbbQbSGKHTitRG9TE0Zg6CA13KDX802pYEpLAv2NvAFtuQAyxsDrMx2HBLxsfTdPJueZpsPDj3yD+5pH3zvp8RKzyMU1as0J97fyzxeuyvvEPAXHEv9w0OT3xL1ZHgQRxg8kKO5qeKyFaKmw0EsLWy2yNjLxOzYCuz1Dy4xU5sSXbtJi7uizdzGCkX8F8i1LaBaqXtrtMK-zzyZyFwgJeupo0TPDbzpUsgPr1AFDJLPzrEgdyBgerveKzyQIwdGbwevXYJVZB55t8jmSPCuBvNcTfUjWvZ9qMwbsOJJhHDEaJVkasTJguBSqizGBkyLTW1baMbaaDrAbQhJ60tZMfvH21LwqpIdDWLGCsQqxRx8jnC5s1AWnMc7rMYyfsbOwbuXrPAlDlBXZdpUX7hJiE24KTaGRz1LsL1IY9bMZFZvthLZP+AZT+u2plCFDuEuDJvtzIkrZnsud8nbYef9aLXwc8SgQUyH6Rgqo9z6TNrWIBype1J4L9P6dMalK7bagHY+QbsPAWWdL67XKFD82poOPcsUzlCjS4eielgyFBHyGF7wd+BFAdr66ckFBUWMiJfpaOFuAnwQPmGddm4Y4W6zDY4i7W745esdZ0dGVQqSZonnLVq0R9x0i9dZTTdn7BEsbF6P6349fDv9fE0JhNoPKJQHC8TtCKyxyLvksdcndddD4XUXcBZetL7PrKZNIsi1L4F8jvH3TEFxSs7Hcm7ffIg0E4BMB0F-cQAJe8ieGiEQTgRUP4GCWVAEEMgVDqrve6Ptf4fw+zdo-xdycD0FDVYvNIk+AxqsS16wvWk5symRcfeU8QEI9WFxckd08o36Q1rcTyYnwChofRQTauApKaHxyxgTPVNjC5FcL7YMKFFMCRQSvnNxgWXJhaBxakwMi0ooSvT4JNEmVkvk+ShtEEidECI9E4CrftZ0dq4gH9z83vo0SpI4-Xh+B3hc63F4r3EHFscdAZhZY43aF+D9WIBSppns5mCXTOBwttdTPvkQkbuMhPLgSolafrI0M7DtAcS2uuO3ddaZ-WjTPlUcUs2GkbsG9Jes4806AnzrPRRdDl+rLMg+H6A892+1-Z-tmVkRnVnNN1kbuiw2aF8oTF9s-phGBDzvr9P8RaA3lmZrk-2bmuwbuYFpmgvoTXBMSnnscntdBhd5tb-lXfm2wpPsPHPvs6XLF9cTbSK+DzKRhmUnzK46ER5Yw8mMnsgyqoXUAqlJeDp0iHoIodAXgOZDLwFotwCCaWc8LMlVwTVLqtVJSizRz4i8twIzPJg6kMhqsms4cPMO8QzIOoPo0ENTFF3srgCrqHdcuu7QB47xiEhQPwMlweAJ92QHIOjt-lMDookwzwTARALV43Vpw39DcrTxf4o0iMfvW5J5lsTmBm0e1eAYdXuDHUxBV1GatODup0IoBdJd9K0CHi9NHg7LU+O9QzJdogaznclkvRbpy14azfWjgnScBJ0eaJfRQFGijDlNkKygKMCAMmb10cAjdKWk4PfrO1lK8CeDiqklROA9gn1XkLeCoqlFzABwK7KfXWIVAn6YQl+oXUDqr0y6btIqvB1jgcQMIjpeAcmjSFGUxy3JTJNjTpB5DwhdtN+m3WdoxlN629Xegrj14RotAraYaLXA+KWcS+7QdMChHmi0ZNqpZGvovWfpN1ChK9Uup-WBDSDf6TBOIVgg1IvdZoMEMypMIJYJQswcdeYee0Qy1MtGRjKGDLVz4W90o2bPpsPGbS9dSmO4DUscH8YlpAmU-DhncMSYBN0MsQ-AZMi6bg45UaEYjGoMkZQpa4h+EmKIIWF4NgRj-eJsY0aboj-SG7BkE8lepJJak1acoGoMx4VBM0MqPGH4xRHXDUmDTJJk0zqbxNhecguxt4A0B6BMC9OG1IMwoFr9PAqbQOPswCBAA */
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
