import React from "react";
import { Typography, Box, Collapse } from "@mui/material";
import { groupHistory } from "./util/groupHistory";
import { ExpandMore } from "@mui/icons-material";
import moment from "moment";
import { Summary } from "./components/Summary";

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

  const groupedHistory = groupHistory(history, payload.guid);
  const today = moment().format("DD MMMM YYYY");
  const yesterday = moment().subtract(1, "days").format("DD MMMM YYYY");

  return (
    <Box sx={{ m: 1 }}>
      {Object.entries(groupedHistory).map(([monthYear, dates], i) => {
        if (Object.keys(dates).length === 0) {
          return null; // skip rendering this node if there are no dates for the monthYear
        }
        return (
          <Box key={monthYear} defaultExpanded={i === 0}>
            <Summary
              onClick={() => {
                chatbot.setState("selectedMonth", monthYear);
              }}
            >
              {monthYear}{" "}
            </Summary>
            <Collapse
              in={(i === 0 && !selectedMonth) || monthYear === selectedMonth}
            >
              {Object.entries(dates).map(([date, convos], k) => {
                const conversations = convos.filter(
                  (conversation) => conversation.guid !== payload.guid
                );
                if (!conversations.length) {
                  return null;
                }
                return (
                  <Box sx={{ ml: 3 }} key={date}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        chatbot.setState("selectedDate", date);
                      }}
                      variant="subtitle2"
                    >
                      {" "}
                      {date === today
                        ? "Today"
                        : date === yesterday
                        ? "Yesterday"
                        : date}
                    </Typography>
                    <Collapse
                      in={(k === 0 && !selectedDate) || selectedDate === date}
                    >
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
          </Box>
        );
      })}
    </Box>
  );
};

export default ConversationList;
