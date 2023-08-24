import React from "react";
import { Typography, Box, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TinyButton from "./styled/TinyButton";
import { groupHistory } from "./util/groupHistory";
import GroupedConversations from "./components/GroupedHistoryTree";

const Summary = ({ onClick, children }) => {
  return (
    <Box
      sx={{
        ml: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography sx={{ cursor: "pointer" }} variant="subtitle2">
        {children}
      </Typography>
      <TinyButton icon={ExpandMoreIcon} onClick={onClick} />
    </Box>
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

  const groupedHistory = groupHistory(history);

  // return (
  //   <GroupedConversations
  //     {...chatbot}
  //     setChat={setChat}
  //     groupedHistory={groupedHistory}
  //   />
  // );

  return (
    <Box sx={{ m: 1 }}>
      {Object.entries(groupedHistory).map(([monthYear, dates], i) => (
        <Box key={monthYear} defaultExpanded={i === 0}>
          <Summary
            onClick={() => {
              chatbot.setState("selectedMonth", monthYear);
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            {monthYear}{" "}
          </Summary>
          <Collapse
            in={(i === 0 && !selectedMonth) || monthYear === selectedMonth}
          >
            {Object.entries(dates).map(([date, convos], k) => (
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
                  {date}
                </Typography>
                <Collapse
                  in={(k === 0 && !selectedDate) || selectedDate === date}
                >
                  <ul>
                    {convos
                      .filter((convo) => convo.guid !== payload.guid)
                      .map((convo) => (
                        <li
                          key={convo.guid}
                          onClick={() => setChat(convo)}
                          style={{ cursor: "pointer" }}
                          className={!!convo.agent ? "attach" : "normal"}
                        >
                          {convo.title}
                        </li>
                      ))}
                  </ul>
                </Collapse>
              </Box>
            ))}
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default ConversationList;
