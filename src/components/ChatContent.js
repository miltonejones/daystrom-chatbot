// Import React dependencies
import React from "react";
import PropTypes from "prop-types";
import ChatNode from "./ChatNode";
import EmptyChat from "./EmptyChat";

// Define propTypes for the ChatContent component
ChatContent.propTypes = {
  chatbot: PropTypes.shape({
    chatmem: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        role: PropTypes.string,
        timestamp: PropTypes.number,
      })
    ),
    streamText: PropTypes.string,
    loggedin: PropTypes.bool,
    send: PropTypes.func.isRequired,
  }).isRequired,
  createChat: PropTypes.func.isRequired,
};

// Define defaultProps for the ChatContent component
ChatContent.defaultProps = {
  chatbot: {
    chatmem: [],
    streamText: "",
    loggedin: false,
    send: () => {},
  },
  createChat: () => {},
};

// Define a functional component called ChatContent
function ChatContent({ chatbot, createChat }) {
  // If there is no chat history, display an empty chat component
  if (!chatbot.chatmem.length) {
    return <EmptyChat chatbot={chatbot} onClick={createChat} />;
  }

  // If there is chat history, map over the chat history and render each chat node
  return (
    <>
      {chatbot.chatmem.map((chat, index) => (
        <ChatNode
          key={index}
          index={index}
          loggedin={chatbot.loggedin}
          {...chat}
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

      {/* If there is a stream text for the chatbot, render a chat node with the stream text */}
      {!!chatbot.streamText && (
        <ChatNode
          role="assistant"
          content={chatbot.streamText}
          timestamp={new Date().getTime()}
        />
      )}
    </>
  );
}

// Export the ChatContent component
export default ChatContent;
