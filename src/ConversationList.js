import React, { useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

const ConversationList = ({ chatbot }) => {
  const setChat = (payload) => {
    chatbot.send({
      type: "change conversation",
      payload,
    });
  };
  const { payload, conversations: history } = chatbot;

  const groupedHistory = Object.values(history).reduce((acc, convo) => {
    const date = moment(convo.mem[0].timestamp).format("MMMM YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(convo);
    return acc;
  }, {});

  return (
    <Box sx={{ m: 1 }}>
      {Object.entries(groupedHistory).map(([date, convos], i) => (
        <Accordion key={date} defaultExpanded={i === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">{date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ConversationList;
