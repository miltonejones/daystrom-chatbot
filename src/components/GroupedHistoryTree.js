import React, { useState } from "react";
import { styled, Collapse, Container, Typography } from "@mui/material";

const StyledContainer = styled(Container)`
  margin-top: 30px;
`;

const MonthYearLabel = styled(Typography)`
  cursor: pointer;
  padding: 10px;
`;

const DateLabel = styled(Typography)`
  cursor: pointer;
  padding: 10px;
  margin-left: 20px;
`;

const ConversationContainer = styled(Container)`
  padding: 5px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ConversationHeader = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function GroupedConversations({
  payload,
  setState,
  selectedDate,
  setChat,
  selectedMonth,
  conversations: history,
  groupedHistory,
}) {
  const [openMonthYears, setOpenMonthYears] = useState([]);
  const [openDates, setOpenDates] = useState([]);

  const toggleMonthYear = (monthYear) => {
    const currentIndex = openMonthYears.indexOf(monthYear);
    const newOpen = [...openMonthYears];
    if (currentIndex === -1) {
      newOpen.push(monthYear);
    } else {
      newOpen.splice(currentIndex, 1);
    }
    setOpenMonthYears(newOpen);
  };

  const toggleDate = (monthYear, date) => {
    const currentIndex = openDates.indexOf(`${monthYear}-${date}`);
    const newOpen = [...openDates];
    if (currentIndex === -1) {
      newOpen.push(`${monthYear}-${date}`);
    } else {
      newOpen.splice(currentIndex, 1);
    }
    setOpenDates(newOpen);
  };

  return (
    <StyledContainer maxWidth="sm">
      {Object.entries(groupedHistory).map(([monthYear, dates], i) => (
        <div key={monthYear}>
          <MonthYearLabel
            variant="subtitle2"
            onClick={() => {
              setState("selectedMonth", monthYear);
            }}
          >
            {monthYear}
          </MonthYearLabel>
          <Collapse
            in={(i === 0 && !selectedMonth) || monthYear === selectedMonth}
          >
            {Object.entries(dates).map(([date, conversations], k) => (
              <div key={`${monthYear}-${date}`}>
                <DateLabel
                  variant="body2"
                  onClick={() => {
                    setState("selectedDate", date);
                  }}
                >
                  {date}
                </DateLabel>
                <Collapse
                  in={(k === 0 && !selectedDate) || selectedDate === date}
                >
                  {conversations
                    .filter((convo) => convo.guid !== payload.guid)
                    .map((conversation) => (
                      <ConversationContainer
                        key={conversation.guid}
                        onClick={() => setChat(conversation)}
                      >
                        <ConversationHeader variant="body2">
                          {conversation.title}
                        </ConversationHeader>
                        {/* <Typography variant="caption">
                          {conversation.mem.length} messages
                        </Typography> */}
                      </ConversationContainer>
                    ))}
                </Collapse>
              </div>
            ))}
          </Collapse>
        </div>
      ))}
    </StyledContainer>
  );
}

export default GroupedConversations;
