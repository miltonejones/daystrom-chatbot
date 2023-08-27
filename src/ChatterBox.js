import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import VoiceInput from "./VoiceInput";
import ChatInput from "./components/ChatInput";
import VoiceToggleButton from "./components/VoiceToggleButton";
import ChatContent from "./components/ChatContent";
import ChatBox from "./styled/ChatBox";

const ChatterBox = ({
  chatbot,
  chatQuestion,
  setChatQuestion,
  handleSubmit,
  createChat,
  ...props
}) => {
  const offset = 130;
  const ref = React.useRef(null);

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
  React.useEffect(() => {
    const div = ref.current;
    if (!div) return;
    div.scrollTop = div.scrollHeight;
  }, [ref, chatbot.streamText]);

  return (
    <>
      {modeListening && <VoiceInput chatbot={chatbot} />}

      <div
        style={{
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
          {!!querying && (
            <LinearProgress
              color={chatbot.state.can("recover") ? "error" : "secondary"}
            />
          )}

          <ChatBox ref={ref} offset={offset}>
            <ChatContent chatbot={chatbot} createChat={createChat} />
          </ChatBox>
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
