// ChatContent.js

import ChatNode from "./ChatNode";
import EmptyChat from "./EmptyChat";

const ChatContent = ({ chatbot, createChat }) => {
  return (
    <>
      {!chatbot.chatmem.length && (
        <EmptyChat chatbot={chatbot} onClick={createChat} />
      )}

      {chatbot.chatmem.map((c, m) => (
        <ChatNode
          key={m}
          index={m}
          loggedin={chatbot.loggedin}
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
    </>
  );
};

export default ChatContent;
