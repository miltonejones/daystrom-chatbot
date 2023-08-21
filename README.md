# Chatbot with React and XState

This project implements a conversational chatbot using React and the XState state machine library.

## Features

- Voice and text chatbot modes 
- Speech recognition and synthesis for voice mode
- GPT-3 integration to generate responses
- Persistent conversation history/context
- Clipboard copy for chat extracts
- Customizable settings - language, temperature, tokens etc.

## Architecture

The bot is built using a state machine architecture with XState. The different states like `Waiting for Input`, `Processing Prompt`, `Speaking Response` etc are defined with allowed transitions.

React hooks like `useMachine` and `useEffect` integrate the state machine with React components. 

Services contain the business logic for each state transition. For example, the `Process Prompt` state calls the `GPT-3 API` service to generate the next response.

State context stores conversation data like the chat history, settings and current prompt.

Helper methods allow controlling and updating the context from external components.

## Getting Started

### Prerequisites

- Node.js and npm
- GPT-3 API key

### Installation

- Clone the repo
- Run `npm install`
- Add your GPT-3 key to `.env`
- Run `npm start`

### Usage

The chatbot supports both voice and text modes. 

In voice mode, pressing the mic button starts speech recognition. Speaking a query sends it to GPT-3 to generate a response. 

In text mode, you can type queries and get responses.

Conversations are persisted across sessions. You can give titles to conversations to navigate between them.

The settings sidebar allows customizing options like temperature, voice etc.

## Contributing

Pull requests are welcome! Here are some ideas for improvements:

- Add more NLP features like sentiment analysis 
- Improve state management for complex conversations
- Modularize code into separate components 
- Better error handling
- Visual chat UI improvements
- Accessibility improvements
- Testing - unit and integration 
- Performance optimizations

## License

This project is licensed under the MIT license. See [LICENSE](LICENSE) for more details.

Let me know if you would like any clarification or have additional suggestions for the README!