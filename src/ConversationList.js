import React from "react";
import {
  Typography,
  Box,
  Collapse,
  Dialog,
  Stack,
  Button,
} from "@mui/material";
import { Summary } from "./components/Summary";
import { groupHistory } from "./util/groupHistory";
import moment from "moment";
import Flex from "./styled/Flex";
import StorageUsage from "./components/StorageUsage";
import TinyButton from "./styled/TinyButton";
import { Delete } from "@mui/icons-material";
import MobileMenu from "./styled/MobileMenu";
import { useModal } from "./hooks/useModal";

const ConversationDateNode = ({ expanded, onClick, date, onDelete }) => {
  const [hidden, setHidden] = React.useState(true);

  const today = moment().format("DD MMMM YY");
  const yesterday = moment().subtract(1, "days").format("DD MMMM YY");
  return (
    <Flex
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <Typography
        className={expanded ? "expanded treenode" : "treenode"}
        sx={{
          cursor: "pointer",
        }}
        onClick={onClick}
        variant="subtitle2"
      >
        {" "}
        {date === today ? "Today" : date === yesterday ? "Yesterday" : date}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <TinyButton onClick={() => onDelete(date)} hide={hidden} icon={Delete} />
    </Flex>
  );
};

const ConversationList = ({ chatbot }) => {
  const setChat = (payload) => {
    chatbot.send({
      type: "change conversation",
      payload,
    });
  };
  const {
    payload,
    selectedDate,
    selectedMonth,
    conversations: history,
  } = chatbot;

  const modal = useModal((data) => {
    const conversationArr = Object.values(history);
    const stripped = conversationArr
      .filter((f) => {
        const stamp = moment(f.mem[0].timestamp).format("DD MMMM YY");
        return stamp !== modal.value;
      })
      .reduce((out, res) => {
        out[res.guid] = res;
        return out;
      }, {});
    console.log({ stripped });
    chatbot.setState("conversations", stripped);
  });
  const groupedHistory = groupHistory(history, payload.guid);
  // const today = moment().format("DD MMMM YY");
  // const yesterday = moment().subtract(1, "days").format("DD MMMM YY");
  const entries = Object.entries(groupedHistory);

  if (!entries.length) {
    return (
      <Flex onClick={() => chatbot.send("new chat")} link sx={{ p: 2 }}>
        No conversations yet. Start talking!
      </Flex>
    );
  }

  return (
    <>
      <MobileMenu
        onClose={() => modal.send("close")}
        open={modal.open}
        component={Dialog}
      >
        <Stack sx={{ m: 2, minWidth: 400 }}>
          <Flex variant="subtitle2">Confirm Deletion</Flex>
          <Box sx={{ mt: 2 }}>
            Delete conversations for date "[{modal.value}]"?
          </Box>
          <Flex sx={{ mt: 2 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={() => modal.send("close")}>Cancel</Button>
            <Button variant="contained" onClick={() => modal.send("okay")}>
              Okay
            </Button>
          </Flex>
        </Stack>
      </MobileMenu>
      <Box sx={{ m: 1 }}>
        {entries.map(([monthYear, dates], i) => {
          if (Object.keys(dates).length === 0) {
            return null; // skip rendering this node if there are no dates for the monthYear
          }
          const expanded =
            (i === 0 && !selectedMonth) || monthYear === selectedMonth;
          return (
            <Box key={monthYear} defaultExpanded={i === 0}>
              <Summary
                expanded={expanded}
                onClick={() => {
                  chatbot.setState("selectedMonth", monthYear);
                }}
              >
                {monthYear}{" "}
              </Summary>
              <Collapse in={expanded}>
                {Object.entries(dates).map(([date, convos], k) => {
                  const conversations = convos.filter(
                    (conversation) => conversation.guid !== payload.guid
                  );
                  if (!conversations.length) {
                    return null;
                  }
                  const expanded =
                    (k === 0 && !selectedDate) || selectedDate === date;
                  return (
                    <Box sx={{ ml: 3 }} key={date}>
                      <ConversationDateNode
                        expanded={expanded}
                        date={date}
                        onDelete={(date) =>
                          modal.send({
                            type: "open",
                            value: date,
                          })
                        }
                        onClick={() => {
                          chatbot.setState("selectedDate", date);
                        }}
                      />

                      <Collapse in={expanded}>
                        <ul>
                          {conversations.map((conversation) => (
                            <li
                              key={conversation.guid}
                              onClick={() => setChat(conversation)}
                              style={{ cursor: "pointer" }}
                              className={
                                !!conversation.agent ? "attach" : "normal"
                              }
                            >
                              {conversation.title}
                            </li>
                          ))}
                        </ul>
                      </Collapse>
                    </Box>
                  );
                })}
              </Collapse>
              <StorageUsage conversations={history} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ConversationList;
