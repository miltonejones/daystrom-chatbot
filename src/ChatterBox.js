import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import VoiceInput from "./VoiceInput";
import ChatNode from "./components/ChatNode";
import ChatInput from "./components/ChatInput";
import EmptyChat from "./components/EmptyChat";
import VoiceToggleButton from "./components/VoiceToggleButton";

const ChatterBox = ({
  chatbot,
  chatQuestion,
  setChatQuestion,
  handleSubmit,
  createChat,
  ...props
}) => {
  const offset = 130;

  const modeListening = ["pause for effect", "Accepting voice input"].some(
    chatbot.state.matches
  );
  const querying = ["initialize engine", "Process chat prompt"].some(
    chatbot.state.matches
  );

  const talk = () => chatbot.send("use voice");

  const textProps = {
    chatbot,
    chatQuestion,
    setChatQuestion,
    talk,
    ...props,
  };

  const windowHeight = "100vh";

  return (
    <>
      {modeListening && <VoiceInput chatbot={chatbot} />}

      <div
        style={{
          transition: "all 0.3s linear",
          width: "calc(100vw - 20px)",
          height: `calc(${windowHeight} - ${offset}px)`,
          overflow: "hidden",
        }}
      >
        <Card
          sx={{
            p: 1,
            height: `calc(${windowHeight} - ${offset + 20}px)`,
          }}
          elevation={2}
          variant="elevation"
        >
          {!!querying && <LinearProgress />}

          <Box
            sx={{
              mb: 1,
              height: `calc(${windowHeight} - ${offset}px)`,
              overflow: "scroll",
            }}
          >
            {!chatbot.chatmem.length && (
              <EmptyChat chatbot={chatbot} onClick={createChat} />
            )}
            {chatbot.chatmem.map((c, m) => (
              <ChatNode
                key={m}
                index={m}
                {...c}
                rephrase={(prompt, index) =>
                  chatbot.send({
                    type: "rephrase",
                    prompt,
                    index,
                  })
                }
                retry={(index) =>
                  chatbot.send({
                    type: "retry",
                    index,
                  })
                }
              />
            ))}
            {!!chatbot.streamText && (
              <ChatNode
                role="assistant"
                content={chatbot.streamText}
                timestamp={new Date().getTime()}
              />
            )}
          </Box>
        </Card>
      </div>
      <form onSubmit={handleSubmit}>
        <ChatInput {...textProps} />
      </form>
      <VoiceToggleButton {...chatbot} />
    </>
  );
};

export default ChatterBox;
