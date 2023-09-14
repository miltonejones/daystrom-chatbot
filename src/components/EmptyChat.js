import { Mic } from "@mui/icons-material";
import Flex from "../styled/Flex";
import { ChatPane } from "../styled/ChatPane";
import { BigFab } from "../styled/BigFab";

const EmptyChat = ({ chatbot, onClick }) => {
  const disabled = !chatbot.state.matches("waiting for input");
  return (
    <ChatPane>
      <Flex disabled={disabled}>Click here to ask any question.</Flex>
      <BigFab onClick={onClick} disabled={disabled} color="primary">
        <Mic />
      </BigFab>
      <Flex disabled variant="caption" sx={{ mt: 2 }}>
        ChatGPT may produce inaccurate information about people, places, or
        facts.
      </Flex>
    </ChatPane>
  );
};

export default EmptyChat;
